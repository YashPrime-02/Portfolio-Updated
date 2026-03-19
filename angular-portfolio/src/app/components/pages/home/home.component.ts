import {
  Component,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';

import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('nameFade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('400ms ease-out')),
      transition('hidden => visible', animate('400ms ease-in'))
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ================= CORE FLAGS =================
  isBrowser = false;
  isLoading = true;
  private ticking = false;

  private minLoaderTime = 1800;
  private startTime = 0;
  private api(path: string) {
    return `${environment.apiBase}${path}`;
  }
  // ================= VIEWCHILD =================
  @ViewChild('railRef') railRef?: ElementRef<HTMLDivElement>;
  @ViewChild('timelineRef') timelineRef?: ElementRef<HTMLDivElement>;
  @ViewChildren('itemRef') itemRefs?: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('testimonialTrack') testimonialTrack?: ElementRef;

  // ================= COUNTERS =================
  yearsOfExperience = 0;
  numberOfProjects = 0;
  numberOfTechnologies = 0;

  targetYearsOfExperience = 2;
  targetNumberOfProjects = 10;
  targetNumberOfTechnologies = 16;

  // ================= NAME ROTATION =================
  nameTranslations: string[] = [
    'Yash Mishra',
    'यश मिश्रा',
    'ਯਸ਼ ਮਿਸ਼ਰਾ',
    'ଯଶ ମିଶ୍ର',
    'યશ મિશ્રા',
    'ಯಶ ಮಿಶ್ರ',
    'యశ్ మిశ్రా',
    'யஷ் மிஷ்ரா',
    'യഷ് മിശ്ര',
    'যশ মিশ্রা',
    'Яш Мишра'
  ];

  currentName = this.nameTranslations[0];
  nameIndex = 0;
  nameFadeState: 'visible' | 'hidden' = 'visible';

  technologies = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/html5.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/css3.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/javascript.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/typescript.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/react.svg' },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/angular.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/bootstrap.svg' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postman.svg' },
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/jest.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/nodedotjs.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/express.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postgresql.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/supabase.svg' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/vercel.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/git.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/github.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/figma.svg' }
  ];
  // ================= TIMELINE =================
  timelineProgress = 0;
  activeTimelineIndex = 0;
  resumeUrl = '';

  // ================= TESTIMONIALS =================
  // Testimonials
  testimonials = [

    {
      message: ' I had the opportunity to mentor Yash Mishra during his tenure as President of the E-CELL ABESEC. Yash consistently demonstrated outstanding leadership, strategic insight,Under his leadership, the E-CELL ABESEC achieved remarkable success, including securing an All India Rank 27 at the national level — a reflection of his ability to set ambitious goals and drive high-performance execution.',

      name: 'Mahendra Kr Gupta (CEO INurture Incubation Foundation)',
      image: '/assets/Testimonial_Photos/mahendra sir.webp',
      linkedinUrl: 'https://www.linkedin.com/in/mahendrakgupta/',
    },

    {
      message: 'I had the pleasure of collaborating with Yash and was impressed by his ability to lead, and uplift the entire team which makes him a great team player. He is high spirited and has a natural talent for taking initiative as well.',
      name: 'Tarushi Singh (PhonePay Pvt Ltd)',
      image: '/assets/Testimonial_Photos/Tarushi_Singh.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/tarushi-singh/',
    },

    {
      message: 'Working with Yash was a truly rewarding experience. His ability to energize the team and consistently take initiative made a big impact. He’s a natural collaborator, always uplifting those around him and driving the team forward with enthusiasm.',
      name: 'Priyanka Singh (Bharat Pay)',
      image: '/assets/Testimonial_Photos/Priyanka_Singh.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/priyanka-singh-801674196/',
    },
    {
      message: 'Yash stands out because he leads by doing, never just directing. He brings everyone together, and tackles every challenge with genuine passion and professionalism. On the technical side, his Angular skills are top‑notch—he builds clean, modular components, masters reactive data flows with RxJS, and ensures fast, responsive apps with lazy loading and AOT compilation.',
      name: 'Divyanshu Gupta (Armstrong Finance Limited)',
      image: '/assets/Testimonial_Photos/Divyanshu_Gupta.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/divyanshu-gupta-691310202/',
    },
    {
      message: 'Working alongside Yash Mishra on the E-Cell website was a great experience. His dedication and front-end development skills consistently elevated our project. As a team, we ensured every detail was refined, making the process both collaborative and rewarding.',
      name: 'Neelansh Pandey (KSOLVES Pvt Ltd)',
      image: '/assets/Testimonial_Photos/Neelansh_Pandey.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/neelansh-pandey-81348b21b/',
    },


    {
      message: 'Collaborating with Yash Mishra on the UI/UX design of the E-Cell website was an enriching experience. His creative approach and attention to detail made our teamwork smooth and effective, helping us bring the best version of our ideas to life.',
      name: 'Shubhansh Mahawar (Goldenflitch)',
      image: '/assets/Testimonial_Photos/Shubhansh_Mahawar.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/shubhansh-mahawar-5a822420b/',
    },
    // {
    //   message: 'During my tenure in E-Cell, I had the privilege of working under Yash sir as the President.  His knowledge of Front-end Development, design and mentorship have been truly commendable.',
    //   name: 'Divyam Kumar',
    //   image: '/assets/Testimonial_Photos/Divyam_Kumar.jpg',
    //   linkedinUrl:'https://www.linkedin.com/in/divyam-kumar-b7406a258/',
    // },
    {
      message: 'Yash Mishra Sir’s presence was truly inspiring. Collaborating with him during our time in E-Cell taught me invaluable lessons in teamwork and collective effort. His calm leadership and constant encouragement created an environment where ideas flourished and every contribution mattered. I’m grateful for the growth I experienced.',
      name: 'Tanishka Saharawat (BossCoder Academy)',
      image: '/assets/Testimonial_Photos/Tanishka_Saharawat.jpg',
      linkedinUrl: 'https://www.linkedin.com/in/tanishka-saharawat/',
    },
    //  {
    //    message: 'It was great working with you Yash Mishra. Loved the way you explained every minute details and the way you made me comfortable while working on this project. Would love to work with you in further projects.',
    //    name: 'Shreyash Pandey (KSOLVES Pvt Ltd)',
    //    image: '/assets/Testimonial_Photos/Preetam_Ray.jpg',
    //    linkedinUrl:'https://www.linkedin.com/in/shreyash-pandey-7064ab202/',
    //  },
    {
      message: 'Yash Mishra Sir is an inspiring mentor. Working under his guidance in E-Cell was a daily lesson in teamwork, front-end development, where his expertise truly stood out. He ensured every member felt heard always bringing out the best in us.',
      name: 'Shreya Singh (E-CELL ABESEC TEAM)',
      image: '/assets/Testimonial_Photos/Shreya_Singh.webp',
      linkedinUrl: 'https://www.linkedin.com/in/shreyasingh38/',
    },





  ];

  staticTestimonials = [...this.testimonials];

  loadTestimonials() {
    this.http.get(this.api('/testimonials')).subscribe({
      next: (res: any) => {
        const apiData = (res || [])
          .filter((t: any) => t.name && t.message) // remove null rows
          .map((t: any) => ({
            id: t.id,
            name: t.name,
            message: t.message,
            image: t.image,
            linkedinUrl: t.linkedinurl // 🔥 FIX HERE
          }));

        // ✅ MERGE OLD + NEW
        this.testimonials = [...apiData, ...this.staticTestimonials];

        // re-run animation
        setTimeout(() => {
          if (this.testimonialTrack) {
            this.cloneTestimonials();
          }
        }, 200);
      },
      error: () => {
        // fallback = only old data
        this.testimonials = [...this.staticTestimonials];
      }
    });
  }
  // ================= ACHIEVEMENTS =================

  achievementsTimeline = [
    {
      title: 'Technology Leader Award — ABES Alumni Awards',
      text: 'Built high-performance Angular and React applications, including an IRCTC-inspired booking platform with ~30% performance improvement and a custom multi-language web compiler. Honored for technical leadership and product innovation.',
      year: 'December 2025',
      image: 'assets/achievements/award.webp',
      link: 'https://www.linkedin.com/feed/update/urn:li:activity:7410946619614912512/'
    },

    {
      title: 'NEC Lead — AIR 27, National Entrepreneurship Challenge',
      text: 'Led ABES Engineering College team to All India Rank 27 at the National Entrepreneurship Challenge 2023. Coordinated strategy, execution, and team leadership in a national-level competition.',
      year: 'February 2024',
      image: 'assets/achievements/nec.webp',
      link: 'https://www.linkedin.com/posts/yashmishra02_nec-finals-certificate-and-team-photographs-activity-7181351351103156224-Tmsy?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADUr38oBP8z1CC48TL61PuygOofTkl5WD1Y'
    },

    {
      title: 'Internship Trainee — Research Design & Standards Organisation (RDSO)',
      text: 'Developed a Django-based web application with scalable architecture, implemented core backend features, and integrated frontend components in a high-standard public sector engineering environment.',
      year: 'July 2023',
      image: 'assets/achievements/rdso.webp',
      link: 'https://www.linkedin.com/posts/yashmishra02_indianrailways-internshipcompletion-itintern-activity-7113549593144963073-8G2I?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADUr38oBP8z1CC48TL61PuygOofTkl5WD1Y'
    }
  ];



  loadSettings() {
  this.http.get(this.api('/settings')).subscribe({
    next: (res: any) => {
      this.resumeUrl = res?.resumeUrl || '';
    },
    error: () => {
      this.resumeUrl = '';
    }
  });
}

  // ================= INIT =================
  ngOnInit(): void {

    this.title.setTitle('Home | Yash Mishra Portfolio');
    this.meta.updateTag({
      name: 'description',
      content: 'Frontend Developer specializing in Angular, React, and scalable applications.'
    });

    if (!this.isBrowser) {
      this.yearsOfExperience = this.targetYearsOfExperience;
      this.numberOfProjects = this.targetNumberOfProjects;
      this.numberOfTechnologies = this.targetNumberOfTechnologies;
    }

    if (this.isBrowser) {
      this.loadTestimonials();
      this.loadSettings();

    }
    
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.startTime = performance.now();

    requestAnimationFrame(() => {
      try {
        this.initApp();
      } catch (err) {
        console.error('Init error:', err);
      }

      const elapsed = performance.now() - this.startTime;
      const remaining = this.minLoaderTime - elapsed;

      setTimeout(() => {
        this.isLoading = false;
      }, remaining > 0 ? remaining : 0);
    });

    // 🔥 FAILSAFE (never infinite again)
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }

  // ================= MAIN INIT =================
  initApp() {
    this.animateCounters();
    this.cycleNameTranslations();

    if (this.testimonialTrack) {
      this.cloneTestimonials();
    }

    setTimeout(() => {
      if (this.timelineRef && this.railRef) {
        this.handleAchievementsScroll();
      }
    }, 120);
  }

  // ================= SCROLL =================
  @HostListener('window:scroll')
  onScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.handleAchievementsScroll();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  handleAchievementsScroll(): void {
    if (!this.timelineRef || !this.railRef || !this.itemRefs) return;

    const timelineEl = this.timelineRef.nativeElement;
    const railEl = this.railRef.nativeElement;

    const rect = timelineEl.getBoundingClientRect();
    const scrollY = window.scrollY + window.innerHeight / 2;
    const percent = (scrollY - (rect.top + window.scrollY)) / timelineEl.scrollHeight;

    const clamped = Math.max(0, Math.min(1, percent));
    this.timelineProgress = clamped;

    const travel = (railEl.clientHeight - 22) * clamped;

    const orb = railEl.querySelector('.pulse-orb');
    if (orb) {
      (orb as HTMLElement).style.transform = `translateY(${travel}px)`;
    }

    this.itemRefs.forEach((item, index) => {
      const r = item.nativeElement.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.55 && r.bottom > 0) {
        this.activeTimelineIndex = index;
      }
    });
  }

  // ================= TESTIMONIAL =================
  cloneTestimonials() {


    if (!this.testimonialTrack) return;

    const track = this.testimonialTrack.nativeElement as HTMLElement;
    track.innerHTML = track.innerHTML; // ✅ prevents infinite duplication
    const cards = track.querySelectorAll<HTMLElement>('.testimonial-card');

    if (!cards.length) return;

    setTimeout(() => {
      cards.forEach(card => {
        track.appendChild(card.cloneNode(true));
      });
    }, 120);
  }

  // ================= NAME =================
  cycleNameTranslations() {
    setInterval(() => {
      this.nameFadeState = 'hidden';

      setTimeout(() => {
        this.nameIndex = (this.nameIndex + 1) % this.nameTranslations.length;
        this.currentName = this.nameTranslations[this.nameIndex];
        this.nameFadeState = 'visible';
      }, 400);

    }, 1600);
  }

  // ================= COUNTERS =================
  animateCounters() {
    this.incrementCounter('yearsOfExperience', this.targetYearsOfExperience);
    this.incrementCounter('numberOfProjects', this.targetNumberOfProjects);
    this.incrementCounter('numberOfTechnologies', this.targetNumberOfTechnologies);
  }

  incrementCounter(property: string, target: number) {
    let current = 0;
    const speed = this.calculateSpeed(target);

    const interval = setInterval(() => {
      current++;
      (this as any)[property] = current;

      if (current >= target) clearInterval(interval);
    }, speed);
  }

  calculateSpeed(target: number): number {
    if (target <= 5) return 350;
    if (target <= 15) return 140;
    return 70;
  }


}
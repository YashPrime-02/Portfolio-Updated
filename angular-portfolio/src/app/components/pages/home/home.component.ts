import {
  Component, ElementRef, ViewChild, ViewChildren, QueryList, OnInit, AfterViewInit, Inject, PLATFORM_ID, HostListener
} from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink],
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
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})

export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('railRef', { static: false }) railRef!: ElementRef<HTMLDivElement>;

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // 🔹 SEO Meta Tags
    if (this.title && this.meta) {
      this.title.setTitle('Home | Yash Mishra Portfolio');
      this.meta.updateTag({ name: 'description', content: 'Welcome to Yash Mishra’s portfolio showcasing skills in Angular, Node.js, and full-stack development.' });
      this.meta.updateTag({ name: 'robots', content: 'index, follow' });
      this.meta.updateTag({ property: 'og:title', content: 'Home | Yash Mishra Portfolio' });
      this.meta.updateTag({ property: 'og:description', content: 'Portfolio homepage of Yash Mishra, software developer specialized in Angular and full-stack projects.' });
      this.meta.updateTag({ property: 'og:url', content: 'https://portfolio-updated-lwhs.vercel.app/' });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
    }

    // Only start animations if it's running in the browser
    if (this.isBrowser) {
      this.animateCounters();
      this.cycleNameTranslations();
    } else {
      // Static values for SSR
      this.yearsOfExperience = this.targetYearsOfExperience;
      this.numberOfProjects = this.targetNumberOfProjects;
      this.numberOfTechnologies = this.targetNumberOfTechnologies;
    }
  }
  @ViewChild('testimonialTrack', { static: false }) testimonialTrack!: ElementRef;

  // Animated Counters
  yearsOfExperience = 0;
  numberOfProjects = 0;
  numberOfTechnologies = 0;

  targetYearsOfExperience = 2;
  targetNumberOfProjects = 9;
  targetNumberOfTechnologies = 16;

  // Technologies (Professional + Balanced Count)
  technologies = [
    // Core Web
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/html5.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/css3.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/javascript.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/typescript.svg' },

    // Frontend Frameworks
    { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/react.svg' },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/angular.svg' },

    // UI / Styling
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/bootstrap.svg' },

    // API / Tools
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postman.svg' },

    // Testing (React)
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/jest.svg' },
    // { name: 'React Testing Library', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/testinglibrary.svg' },

    // Performance / Accessibility
    { name: 'Google Lighthouse', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/googlechrome.svg' },
    { name: 'WCAG', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/w3c.svg' },

    // Backend
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/nodedotjs.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/express.svg' },

    // Database / BaaS
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postgresql.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/supabase.svg' },

    // Deployment
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/vercel.svg' },

    // Version Control / CI
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/git.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/github.svg' },
    { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/githubactions.svg' },

    // UI/UX Design
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/figma.svg' }
  ];



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



  // ================= RECENT ACHIEVEMENTS TIMELINE =================

  @ViewChild('timelineRef', { static: false }) timelineRef!: ElementRef<HTMLDivElement>;
  @ViewChildren('itemRef') itemRefs!: QueryList<ElementRef<HTMLElement>>;

  timelineProgress = 0;
  activeTimelineIndex = 0;

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




  @HostListener('window:scroll', [])
  handleAchievementsScroll(): void {
    if (!this.isBrowser || !this.timelineRef || !this.railRef) return;

    const timelineEl = this.timelineRef.nativeElement;
    const railEl = this.railRef.nativeElement;

    const timelineRect = timelineEl.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY;
    const timelineHeight = timelineEl.scrollHeight;

    const scrollY = window.scrollY + window.innerHeight / 2;
    const scrolled = scrollY - timelineTop;
    const percent = scrolled / timelineHeight;

    const clamped = Math.min(Math.max(percent, 0), 1);
    this.timelineProgress = clamped;

    /* 🔹 MOVE BALL IN PIXELS (THIS FIXES IT) */
    const railHeight = railEl.clientHeight;
    const orbSize = 22; // ball height
    const travel = (railHeight - orbSize) * clamped;

    railEl.querySelector('.pulse-orb')!
      .setAttribute('style', `transform: translateY(${travel}px)`);

    /* ACTIVE CARD DETECTION */
    this.itemRefs.forEach((item, index) => {
      const rect = item.nativeElement.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.55 && rect.bottom > 0) {
        this.activeTimelineIndex = index;
      }
    });
  }


  // Rotating Name
  nameTranslations: string[] = [
    'Yash Mishra ',         // English
    'यश मिश्रा ',           // Hindi (Devanagari)
    'ਯਸ਼ ਮਿਸ਼ਰਾ ',           // Punjabi (Gurmukhi)
    'ଯଶ ମିଶ୍ର ',            // Odia
    'યશ મિશ્રા ',           // Gujarati
    'Yash Mishra ',         // English
    'ಯಶ ಮಿಶ್ರ ',            // Kannada
    'యశ్ మిశ్రా ',           // Telugu
    'யஷ் மிஷ்ரா ',           // Tamil
    'യഷ് മിശ്ര ',            // Malayalam
    'যশ মিশ্রা ',            // Bengali
    'Yash Mishra ',         // English
    'यश मिश्र ',            // Sanskrit (minor variation)
    'Yash Mishra ',         // English
    'Яш Мишра ',            // Russian (Cyrillic transliteration)
    'Yash Mishra ',         // English
    'ਯਸ਼ ਮਿਸ਼ਰਾ ',            // Alternate Punjabi spelling


  ];


  currentName: string = this.nameTranslations[0];
  nameIndex: number = 0;
  nameFadeState: 'visible' | 'hidden' = 'visible';
  isBrowser = false;

  // (Removed duplicate ngOnInit)

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const track = this.testimonialTrack.nativeElement as HTMLElement;
      const cards = track.querySelectorAll('.testimonial-card');
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
      });
    }
    // 🔹 initialize achievements timeline position once
    setTimeout(() => {
      this.handleAchievementsScroll();
    }, 50);
  }

  cycleNameTranslations(): void {
    setInterval(() => {
      this.nameFadeState = 'hidden';
      setTimeout(() => {
        this.nameIndex = (this.nameIndex + 1) % this.nameTranslations.length;
        this.currentName = this.nameTranslations[this.nameIndex];
        this.nameFadeState = 'visible';
      }, 400);
    }, 1500);
  }

  animateCounters(): void {
    this.incrementCounter('yearsOfExperience', this.targetYearsOfExperience, this.calculateSpeed(this.targetYearsOfExperience));
    this.incrementCounter('numberOfProjects', this.targetNumberOfProjects, this.calculateSpeed(this.targetNumberOfProjects));
    this.incrementCounter('numberOfTechnologies', this.targetNumberOfTechnologies, this.calculateSpeed(this.targetNumberOfTechnologies));
  }

  incrementCounter(property: string, target: number, intervalSpeed: number): void {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      (this as any)[property] = current;
      if (current === target) {
        clearInterval(interval);
      }
    }, intervalSpeed);
  }

  calculateSpeed(target: number): number {
    if (target <= 5) return 500;
    if (target <= 15) return 200;
    return 100;
  }
  adjustTestimonialSpeed(): void {
    const track = this.testimonialTrack.nativeElement;
    const scrollSpeed = 100; // Adjust the speed here, lower value = faster
    track.style.animationDuration = `${scrollSpeed}s`; // Apply this speed to the testimonial scrolling effect
  }
}

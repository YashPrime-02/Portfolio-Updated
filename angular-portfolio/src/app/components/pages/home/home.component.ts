import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
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
  targetNumberOfProjects = 8;
  targetNumberOfTechnologies = 12;

// Technologies
  technologies = [
  // Core Web Languages (highest SEO value)
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/html5.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/css3.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/javascript.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/typescript.svg' },

  // Frontend Frameworks (high recruiter & SEO weight)
  { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/react.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/angular.svg' },

  // Backend Stack
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/nodedotjs.svg' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/express.svg' },

  // Databases
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postgresql.svg' },

  // Tools & DevOps
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/github.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/git.svg' },
  { name: 'CI/CD (GitHub Actions)', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/githubactions.svg' }
];


  // Testimonials
  testimonials = [

    {
      message: ' I had the opportunity to mentor Yash Mishra during his tenure as President of the E-CELL ABESEC. Yash consistently demonstrated outstanding leadership, strategic insight, and a deep commitment to innovation throughout his time with us. Under his leadership, the E-CELL NEC achieved remarkable success, including securing an All India Rank 27 at the national level — a reflection of his ability to set ambitious goals and drive high-performance execution. Beyond his leadership capabilities, Yash also showcased strong technical skills, notably spearheading the development of the official E-CELL website, enhancing the organization digital presence and operational efficiency',

      name: 'Mahendra Kr Gupta (CEO INurture Incubation Foundation)',
      image: '/assets/Testimonial_Photos/mahendra sir.webp',
      linkedinUrl:'https://www.linkedin.com/in/mahendrakgupta/',
    },

    {
      message: 'I had the pleasure of collaborating with Yash and was impressed by his ability to lead, and uplift the entire team which makes him a great team player. He is high spirited and has a natural talent for taking initiative as well.',
      name: 'Tarushi Singh (InfoEdge Pvt Ltd)',
      image: '/assets/Testimonial_Photos/Tarushi_Singh.jpg',
      linkedinUrl:'https://www.linkedin.com/in/tarushi-singh/',
    },

    {
      message: 'Working with Yash was a truly rewarding experience. His ability to energize the team and consistently take initiative made a big impact. He’s a natural collaborator, always uplifting those around him and driving the team forward with enthusiasm.',
      name: 'Priyanka Singh (Bharat Pay)',
      image: '/assets/Testimonial_Photos/Priyanka_Singh.jpg',
      linkedinUrl:'https://www.linkedin.com/in/priyanka-singh-801674196/',
    },
    {
      message: 'Yash stands out because he leads by doing, never just directing. He brings everyone together, and tackles every challenge with genuine passion and professionalism. On the technical side, his Angular skills are top‑notch—he builds clean, modular components, masters reactive data flows with RxJS, and ensures fast, responsive apps with lazy loading and AOT compilation.',
      name: 'Divyanshu Gupta (Armstrong Finance Limited)',
      image: '/assets/Testimonial_Photos/Divyanshu_Gupta.jpg',
      linkedinUrl:'https://www.linkedin.com/in/divyanshu-gupta-691310202/',
    },
    {
      message: 'Working alongside Yash Mishra on the E-Cell website was a great experience. His dedication and front-end development skills consistently elevated our project. As a team, we ensured every detail was refined, making the process both collaborative and rewarding.',
      name: 'Neelansh Pandey (KSOLVES Pvt Ltd)',
      image: '/assets/Testimonial_Photos/Neelansh_Pandey.jpg',
      linkedinUrl:'https://www.linkedin.com/in/neelansh-pandey-81348b21b/',
    },


    {
      message: 'Collaborating with Yash Mishra on the UI/UX design of the E-Cell website was an enriching experience. His creative approach and attention to detail made our teamwork smooth and effective, helping us bring the best version of our ideas to life.',
      name: 'Shubhansh Mahawar (Goldenflitch)',
      image: '/assets/Testimonial_Photos/Shubhansh_Mahawar.jpg',
      linkedinUrl:'https://www.linkedin.com/in/shubhansh-mahawar-5a822420b/',
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
      linkedinUrl:'https://www.linkedin.com/in/tanishka-saharawat/',
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
      linkedinUrl:'https://www.linkedin.com/in/shreyasingh38/',
    },





  ];

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

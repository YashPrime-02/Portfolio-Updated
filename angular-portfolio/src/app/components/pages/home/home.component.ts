import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

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
  @ViewChild('testimonialTrack', { static: false }) testimonialTrack!: ElementRef;

  // Animated Counters
  yearsOfExperience = 0;
  numberOfProjects = 0;
  numberOfTechnologies = 0;

  targetYearsOfExperience = 1;
  targetNumberOfProjects = 9;
  targetNumberOfTechnologies = 6;

  // Technologies
  technologies = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/html5.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/css3.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/javascript.svg' },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/angular.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/react.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/git.svg' }
  ];

  // Testimonials
  testimonials = [
    {
      message: 'I had the pleasure of collaborating with Yash and was impressed by his ability to lead, and uplift the entire team which makes him a great team player. He is high spirited and has a natural talent for taking initiative as well.',
      name: 'Tarushi Singh',
      image: ''
    },
    {
      message: 'Working with Yash was a truly rewarding experience. His ability to energize the team and consistently take initiative made a big impact. He’s a natural collaborator, always uplifting those around him and driving the team forward with enthusiasm.',
      name: 'Priyanka Singh',
      image: ''
    },
    {
      message: 'Working alongside Yash Mishra on the E-Cell website was a great experience. His dedication and front-end development skills consistently elevated our project. As a team, we ensured every detail was refined, making the process both collaborative and rewarding.',
      name: 'Neelansh Pandey',
      image: ''
    },
    {
      message: 'Collaborating with Yash Mishra on the UI/UX design of the E-Cell website was an enriching experience. His creative approach and attention to detail made our teamwork smooth and effective, helping us bring the best version of our ideas to life.',
      name: 'Shubhansh Mahawar',
      image: ''
    },
    {
      message: 'During my tenure in E-Cell, I had the privilege of working under Yash sir as the President.  His knowledge of Front-end Development, design and mentorship have been truly commendable.',
      name: 'Divyam Kumar',
      image: ''
    },
    {
      message: 'Yash Mishra Sir’s presence was truly inspiring. Collaborating with him during our time in E-Cell taught me invaluable lessons in teamwork and collective effort. His calm leadership and constant encouragement created an environment where ideas flourished and every contribution mattered. I’m grateful for the growth I experienced.',
      name: 'Tanishka Saharawat',
      image: ''
    },

    {
      message: 'Yash Mishra Sir is an inspiring mentor. Working under his guidance in E-Cell was a daily lesson in teamwork, front-end development, where his expertise truly stood out. He ensured every member felt heard always bringing out the best in us.',
      name: 'Shreya Singh',
      image: ''
    },
    {
      message: 'It was great working with you Yash Mishra. Loved the way you explained every minute details and the way you made me comfortable while working on this project. Would love to work with you in further projects.',
      name: 'Preetam Ray',
      image: ''
    },


  ];

  // Rotating Name
  nameTranslations: string[] = [
    'Yash Mishra',
    'यश मिश्रा',
    'ਯਸ਼ ਮਿਸ਼ਰਾ',
    'یَش مِشرا',
    'ଯଶ ମିଶ୍ର',
    // Add the rest of the translations here
  ];

  currentName: string = this.nameTranslations[0];
  nameIndex: number = 0;
  nameFadeState: 'visible' | 'hidden' = 'visible';
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
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

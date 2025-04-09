import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';

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
  targetNumberOfProjects = 10;
  targetNumberOfTechnologies = 7;

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
      message: 'During my tenure in E-Cell, I had the privilege of working under Yash sir as the President...',
      name: 'Divyam Kumar',
      image: 'assets/images/Dk.jpg'
    },
    {
      message: 'Working under Yash Mishra mentorship in E-Cell was an incredible learning experience...',
      name: 'Shreya Singh',
      image: 'assets/images/john_doe.jpg'
    },
    {
      message: 'It was great working with you Yash Mishra. Loved the way you explained every minute details...',
      name: 'Preetam Ray',
      image: 'assets/images/jane_smith.jpg'
    },
    {
      message: 'His design sense and front-end development skills are exceptional. Highly recommended!',
      name: 'Jane Smith',
      image: 'assets/images/jane_smith.jpg'
    }
  ];

  // Rotating Name
  nameTranslations: string[] = ['Yash Mishra', 'यश मिश्रा', 'யாஷ் மிஷ்ரா', 'యాష్ మిశ్రా', 'Яш Мишра', 'Yash ミシュラ'];
  currentName: string = this.nameTranslations[0];
  nameIndex: number = 0;
  nameFadeState: 'visible' | 'hidden' = 'visible';

  constructor() {}

  ngOnInit(): void {
    AOS.init();
    this.animateCounters();
    this.cycleNameTranslations();
  }

  ngAfterViewInit(): void {
    const track = this.testimonialTrack.nativeElement as HTMLElement;
    const cards = track.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }

  cycleNameTranslations(): void {
    setInterval(() => {
      this.nameFadeState = 'hidden'; // Start fade out

      setTimeout(() => {
        this.nameIndex = (this.nameIndex + 1) % this.nameTranslations.length;
        this.currentName = this.nameTranslations[this.nameIndex];
        this.nameFadeState = 'visible'; // Start fade in
      }, 400); // Matches fade out duration
    }, 2000);
  }

  animateCounters(): void {
    this.incrementCounter('yearsOfExperience', this.targetYearsOfExperience, this.calculateSpeed(this.targetYearsOfExperience));
    this.incrementCounter('numberOfProjects', this.targetNumberOfProjects, this.calculateSpeed(this.targetNumberOfProjects));
    this.incrementCounter('numberOfTechnologies', this.targetNumberOfTechnologies, this.calculateSpeed(this.targetNumberOfTechnologies));
  }

  incrementCounter(property: string, target: number, increment: number): void {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      (this as any)[property] = current;
      if (current === target) {
        clearInterval(interval);
      }
    }, increment);
  }

  calculateSpeed(target: number): number {
    if (target <= 5) {
      return 500;
    } else if (target <= 15) {
      return 200;
    } else {
      return 100;
    }
  }
  import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
  import { trigger, transition, style, animate } from '@angular/animations';
  import { CommonModule } from '@angular/common';
  import * as AOS from 'aos';

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
      ])
    ]
  })
  export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild('testimonialTrack', { static: false }) testimonialTrack!: ElementRef;

    // ✅ Animated Counters
    yearsOfExperience = 0;
    numberOfProjects = 0;
    numberOfTechnologies = 0;

    targetYearsOfExperience = 1;
    targetNumberOfProjects = 10;
    targetNumberOfTechnologies = 7;

    // ✅ Name Translations (NEW)
    nameTranslations: string[] = ['Yash Mishra', 'यश मिश्रा', 'யாஷ் மிஷ்ரா', 'యాష్ మిశ్రా', 'યશ મિશ્રા', 'Яш Мишра', 'Yash ミシュラ'];
    currentName: string = this.nameTranslations[0];
    nameIndex: number = 0;

    // ✅ Technologies
    technologies = [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/html5.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/css3.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/javascript.svg' },
      { name: 'Angular', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/angular.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/react.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/git.svg' }
    ];

    // ✅ Testimonials
    testimonials = [
      {
        message: 'During my tenure in E-Cell, I had the privilege of working under Yash sir as the President. His leadership was both inspiring and impactful. Later, as I took charge as a lead, he guided me as a mentor with utmost dedication. A skilled web developer, which greatly benefited our members. His knowledge and mentorship have been truly commendable.',
        name: 'Divyam Kumar',
        image: 'assets/images/Dk.jpg'
      },
      {
        message: 'Working under Yash Mishra mentorship in E-Cell was an incredible learning experience. His leadership made every member feel heard and valued and his ability to bring out the best in the team is truly admirable. I am grateful to have learned from him.',
        name: 'Shreya Singh',
        image: 'assets/images/john_doe.jpg'
      },
      {
        message: 'It was great working with you Yash Mishra. Loved the way you explained every minute details and the way you made me comfortable while working on this project. Would love to work with you in further projects.',
        name: 'Preetam Ray',
        image: 'assets/images/jane_smith.jpg'
      },
      {
        message: 'His design sense and front-end development skills are exceptional. Highly recommended!',
        name: 'Jane Smith',
        image: 'assets/images/jane_smith.jpg'
      },
      {
        message: 'His design sense and front-end development skills are exceptional. Highly recommended!',
        name: 'Jane Smith',
        image: 'assets/images/jane_smith.jpg'
      },
      {
        message: 'His design sense and front-end development skills are exceptional. Highly recommended!',
        name: 'Jane Smith',
        image: 'assets/images/jane_smith.jpg'
      }
    ];

    constructor() {}

    ngOnInit(): void {
      AOS.init(); // ✅ Initialize AOS
      this.animateCounters(); // ✅ Start counter animations
      this.cycleNameTranslations(); // ✅ Start name translation cycle
    }

    ngAfterViewInit(): void {
      // ✅ Clone testimonial cards for infinite scroll effect
      const track = this.testimonialTrack.nativeElement as HTMLElement;
      const cards = track.querySelectorAll('.testimonial-card');
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
      });
    }

    // ✅ Counter Animation Logic
    animateCounters(): void {
      this.incrementCounter('yearsOfExperience', this.targetYearsOfExperience, this.calculateSpeed(this.targetYearsOfExperience));
      this.incrementCounter('numberOfProjects', this.targetNumberOfProjects, this.calculateSpeed(this.targetNumberOfProjects));
      this.incrementCounter('numberOfTechnologies', this.targetNumberOfTechnologies, this.calculateSpeed(this.targetNumberOfTechnologies));
    }

    incrementCounter(property: string, target: number, increment: number): void {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        (this as any)[property] = current;
        if (current === target) {
          clearInterval(interval);
        }
      }, increment);
    }

    calculateSpeed(target: number): number {
      if (target <= 5) {
        return 500;
      } else if (target <= 15) {
        return 200;
      } else {
        return 100;
      }
    }

    // ✅ Testimonial Scroll Controls
    scrollLeft(): void {
      this.testimonialTrack.nativeElement.scrollLeft -= 300;
    }

    scrollRight(): void {
      this.testimonialTrack.nativeElement.scrollLeft += 300;
    }

    // ✅ Name Translation Cycle Logic
    cycleNameTranslations(): void {
      setInterval(() => {
        this.nameIndex = (this.nameIndex + 1) % this.nameTranslations.length;
        this.currentName = this.nameTranslations[this.nameIndex];
      }, 2000); // Change name every 2 seconds
    }
  }




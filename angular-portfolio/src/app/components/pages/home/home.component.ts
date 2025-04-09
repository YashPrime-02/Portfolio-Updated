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

  // Cycle name translations with fade animation
  cycleNameTranslations(): void {
    setInterval(() => {
      this.nameFadeState = 'hidden'; // Fade out
      setTimeout(() => {
        this.nameIndex = (this.nameIndex + 1) % this.nameTranslations.length;
        this.currentName = this.nameTranslations[this.nameIndex];
        this.nameFadeState = 'visible'; // Fade in
      }, 400); // Match fade-out duration
    }, 2000);
  }

  // Animated counters logic
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
}

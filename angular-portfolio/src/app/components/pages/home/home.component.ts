import {
  Component,
  ViewChildren,
  QueryList,
  OnInit,

  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';

import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

interface TechNode {
  id: number;
  name: string;
  icon: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

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
  @ViewChild('techGraph', { static: false }) svgRef!: ElementRef;

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
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/html5.svg', category: 'frontend' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/css3.svg', category: 'frontend' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/javascript.svg', category: 'frontend' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/typescript.svg', category: 'frontend' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/react.svg' , category: 'frontend'},
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/angular.svg' , category: 'frontend'},
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/bootstrap.svg', category: 'frontend' },
    { name: 'Postman', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postman.svg', category: 'tools' },
    { name: 'Jest', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/jest.svg' , category: 'frontend'},
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/nodedotjs.svg', category: 'backend' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/express.svg', category: 'backend'  },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/postgresql.svg', category: 'backend' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/supabase.svg', category: 'backend'  },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/vercel.svg' , category: 'tools'  },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/git.svg' , category: 'tools' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/github.svg', category: 'tools' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@5.0.0/icons/figma.svg', category: 'tools' }
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


initGraph() {
  if (!this.svgRef || !this.svgRef.nativeElement) return;

  const el = this.svgRef.nativeElement;
  const rect = el.getBoundingClientRect();

  if (rect.width === 0 || rect.height === 0) {
    requestAnimationFrame(() => this.initGraph());
    return;
  }

  const width = rect.width || 800;

  // 🔥 HARD device check (this is the ONLY control switch)
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  // layout stays based on container (UNCHANGED)
  const cols =
    width < 480 ? 3 :
    width < 768 ? 4 :
    width < 1024 ? 5 :
    6;

  const rows = Math.ceil(this.technologies.length / cols);

  const height = isMobile
    ? rows * 80 + 40   // mobile compact
    : rows * 110 + 80; // desktop SAME

  let iconSize = 48;
  if (width < 480) iconSize = 26;
  else if (width < 768) iconSize = 32;
  else if (width < 1024) iconSize = 38;
  else if (width > 1440) iconSize = 56;

  const textSize =
    width < 480 ? '8px' :
    width < 768 ? '9px' :
    width < 1024 ? '11px' :
    '12px';

  const collisionRadius = iconSize + 20;

  d3.select(el).selectAll('*').remove();

  const svg = d3.select(el)
    .attr('width', width)
    .attr('height', height);

  const spacingX = width / (cols + 1);
  const spacingY = height / (rows + (isMobile ? 0.6 : 1));

  const nodes: TechNode[] = this.technologies.map((tech, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    return {
      id: i,
      ...tech,
      x: spacingX * (col + 1),
      y: spacingY * (row + 1)
    };
  });

  const node = svg.selectAll<SVGGElement, TechNode>('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .style('cursor', isMobile ? 'default' : 'grab')
    .style('opacity', () => 0.75 + Math.random() * 0.25);

  node.append('image')
    .attr('href', d => d.icon)
    .attr('width', iconSize)
    .attr('height', iconSize)
    .attr('x', -iconSize / 2)
    .attr('y', -iconSize / 2)
    .style('filter', 'invert(1)');

  node.append('text')
    .attr('dy', iconSize / 2 + 14)
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .style('font-size', textSize)
    .text(d => d.name);

  // ================= MOBILE ONLY =================
  if (isMobile) {
    // 🔥 STATIC GRID — no physics, no drag, no float
    node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    return; // 🚨 HARD EXIT → prevents ANY desktop logic
  }

  // ================= DESKTOP (UNTOUCHED) =================
  const simulation = d3.forceSimulation<TechNode>(nodes)
    .force('charge', d3.forceManyBody().strength(-60))
    .force('collision', d3.forceCollide<TechNode>().radius(collisionRadius))
    .force('x', d3.forceX(d => d.x!).strength(0.25))
    .force('y', d3.forceY(d => d.y!).strength(0.25))
    .alpha(1)
    .alphaDecay(0.08);

  node.call(
    d3.drag<SVGGElement, TechNode>()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
  );

  simulation.on('tick', () => {
    const time = Date.now() * 0.002;

    node.attr('transform', d => {
      const floatX = Math.sin(time + d.id) * 1.5;
      const floatY = Math.cos(time + d.id) * 1.5;
      const scale = 0.96 + Math.sin(time + d.id) * 0.04;

      return `translate(${d.x! + floatX}, ${d.y! + floatY}) scale(${scale})`;
    });
  });

  function dragStarted(event: any, d: TechNode) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x ?? 0;
    d.fy = d.y ?? 0;
  }

  function dragged(event: any, d: TechNode) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event: any, d: TechNode) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

private preloadTechIcons() {
  this.technologies.forEach(tech => {
    const img = new Image();
    img.src = tech.icon;
  });
}

private waitForGraphInit() {
  if (!this.isBrowser) return;

  const check = () => {
    if (!this.isLoading && this.svgRef?.nativeElement) {
      this.initGraph();
    } else {
      requestAnimationFrame(check);
    }
  };

  check();
}
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

  ngOnInit(): void {

    this.title.setTitle('Home | Yash Mishra Portfolio');
    this.meta.updateTag({
      name: 'description',
      content: 'Frontend Developer specializing in Angular, React, and scalable applications.'
    });

    if (this.isBrowser) {
  this.loadTestimonials();
  this.loadSettings();

  // 🔥 NEW: preload icons early
  this.preloadTechIcons();
}

    // ================= LOADER CONTROL =================
    if (this.isBrowser) {
      const hasLoaded = sessionStorage.getItem('portfolio_loaded');

      if (hasLoaded) {
        this.isLoading = false; // ❌ skip loader
      } else {
        sessionStorage.setItem('portfolio_loaded', 'true');
        this.isLoading = true; // ✅ show loader first time
      }
    }

    // ================= SSR FALLBACK =================
    if (!this.isBrowser) {
      this.yearsOfExperience = this.targetYearsOfExperience;
      this.numberOfProjects = this.targetNumberOfProjects;
      this.numberOfTechnologies = this.targetNumberOfTechnologies;
    }

    // ================= API LOAD =================
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

      // 🔥 NEW: Wait until loader is gone + DOM ready
      this.waitForGraphInit();

    } catch (err) {
      console.error('Init error:', err);
    }

    // ✅ Loader handling
    if (this.isLoading) {
      const elapsed = performance.now() - this.startTime;
      const remaining = this.minLoaderTime - elapsed;

      setTimeout(() => {
        this.isLoading = false;
      }, remaining > 0 ? remaining : 0);
    }
  });

  // ✅ Failsafe loader kill
  if (this.isLoading) {
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateRepulsorBeam();
  }

  updateRepulsorBeam() {
    if (!this.isBrowser) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    const beam = document.querySelector('.repulsor-beam') as HTMLElement;

    if (beam) {
      beam.style.width = `${progress}vw`;
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
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('cardFadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
        animate(
          '500ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ])
    ])
  ]
})

export class ProjectsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  private api(path: string) {
    return `${environment.apiBase}${path}`;
  }

  ngOnInit() {
    this.loadProjects();
  }

  projects = [
       {
      title: 'F1 Career Simulator & Analyzer',
      description: 'Built a full-stack Formula 1 career simulation platform using React, Node.js, Express, and PostgreSQL, delivering a dynamic and immersive racing management experience optimized for performance and scalability. Designed intuitive UI/UX with interactive dashboards, real-time race simulations, and detailed championship tracking to enhance user engagement. Implemented driver career progression, strategic race weekend systems, and AI-generated race commentary and narrative storytelling powered by Ollama.',
      imageUrl: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTJ0Z2hubmJldnk5aWtycGFzYmUwbHh1bmtqejJqamJ2dTd1azNmcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LZfnGqS8d3Bt8WMnLF/giphy.gif',
      projectUrl: 'https://github.com/YashPrime-02/F1-25-GAME-SIMULATOR---ANALYSER',
      workedUnder: 'Personal Project'
    },
    {
      title: 'Sion Varsity Website',
      description: 'Developed SionVarsity.com as an Angular Developer for EUODIAS Technologies, delivering a feature-rich, responsive educational platform optimized for various devices and screen sizes. Implemented modern UI/UX principles with clean layouts, intuitive navigation, and interactive components to enhance student, faculty, and admin engagement. Integrated dynamic content modules, secure authentication, and role-based access control to ensure a personalized user experience and functionality',
      imageUrl: '/assets/Gifs/ezgif-49153735468cb3.gif',
      projectUrl: 'https://sionvarsity.com/',
      workedUnder: 'EUODIAS Technologies'
    },

    {
      title: 'Unofficial IRCTC Improvised Clone Site',
      description: 'Built Prime Coder, an advanced online code editor using React, featuring real-time HTML, CSS, JavaScript, and TypeScript editing with instant live preview. Implemented a fully responsive interface with custom CSS styling and high-quality animations to deliver a modern, polished, and engaging user experience across devices.  Integrated copy-to-clipboard with animated effects, seamless code compilation, and error handling with visual feedback. Optimized application performance by 30% approx.',
      imageUrl: '/assets/Gifs/Train Station Racing GIF by Burger Records.gif',
      projectUrl: 'https://github.com/YashPrime-02/IRCTC-IMPROVISED-CLONE',
      workedUnder: 'Self Project'
    },

    {
      title: 'Prime Coder Online Web Dev Editor',
      description: 'Built Prime Coder, an advanced online code editor using React, featuring real-time HTML, CSS, JavaScript, and TypeScript editing with instant live preview. Implemented a fully responsive UI with custom styling and smooth animations to ensure an intuitive and engaging user experience across devices. Integrated syntax highlighting, multi-tab layout management, and interactive components for improved developer productivity. Optimized performance, code compilation, and deployment workflows for seamless usability.',
      imageUrl: '/assets/Gifs/Prime_Coder.gif',
      projectUrl: 'https://wonderful-stardust-b1031b.netlify.app/',
      workedUnder: 'Self Project'
    },

    {
      title: 'DevEats – Online Food Delivery Web Application',
      description: 'Designed and developed a fully responsive online food delivery web application using React JS, delivering a seamless and engaging user experience across devices and screen sizes. Built dynamic restaurant listings, interactive menus, and efficient cart management with smooth navigation flows to enhance usability and customer interaction. Implemented a scalable component-based architecture with reusable UI components and clean routing, ensuring maintainability and performance.',
      imageUrl: '/assets/yomato.gif',
      projectUrl: 'https://github.com/YashPrime-02/Food-Delivary-App',
      workedUnder: 'Self Project',
      liveUrl: 'https://food-delivary-app-jet.vercel.app/'
    },

    {
      title: 'REST API Admin Panel & Backend Management System',
      description: 'Designed and developed a secure RESTful API–driven admin panel using Node.js, Express, and MySQL, delivering robust backend functionality with full CRUD operations and efficient data management. Implemented a modular backend architecture with structured request validation, authentication mechanisms, and organized routing to ensure reliability and security. Built with scalability and maintainability in mind, incorporating clean API design, consistent response handling.',
      imageUrl: '/assets/admin-management-tools.webp',
      projectUrl: 'https://github.com/YashPrime-02/REST-API-Admin-Panel',
      workedUnder: 'Self Project'
    },

    {
      title: 'TaskFlow – Team Task Manager & Performance Tracker',
      description: 'Designed and developed a modern team management and performance tracking application using React, Implemented task assignment, status updates, filtering, and real-time UI state management using Context API and localStorage persistence. Integrated interactive performance charts, clean modular component architecture, and smooth UI animations.',
      imageUrl: '/assets/task-manager.webp',
      projectUrl: 'https://github.com/YashPrime-02/Taskflow-App',
      workedUnder: 'Self Project'
    },

    {
      title: 'E-CELL WEBSITE',
      description: 'Conceptualized, built, and coordinated the official website for E-CELL using React, delivering a dynamic and engaging platform for event announcements, team showcases, and entrepreneurial resources. Designed intuitive user interfaces and interactive sections to enhance student engagement and accessibility across devices.',
      imageUrl: '/assets/Gifs/ezgif-227f0475b4023c.gif',
      projectUrl: 'https://ecell-website-v2.vercel.app/',
      workedUnder: 'E-CELL ABESEC TEAM'
    },

    {
      title: 'Todo Using React + Context API',
      description: 'Designed and developed a modern Todo application using React and the Context API, delivering an intuitive and productivity-focused task management experience. Implemented features such as priority tagging, advanced filtering, edit mode, and efficient localStorage persistence to ensure seamless data handling and usability. ',
      imageUrl: '/assets/Gifs/ezgif-4a402e74fe3d73.gif',
      projectUrl: 'https://startling-belekoy-120061.netlify.app/',
      workedUnder: 'Academic Major Project'
    },

    {
      title: 'Doctor Helper Portal',
      description: 'Built Doctor Helper, a full-stack web app for booking doctor appointments. Used Django for secure backend, SQLite for data management, and responsive frontend with  HTML, CSS, Bootstrap. Ensured smooth user flow, authentication, and real-time scheduling.',
      imageUrl: '/assets/Gifs/Mr Bean Thumbs Up GIF.gif',
      projectUrl: 'https://github.com/YashPrime-02/Doctor_Helper',
      workedUnder: 'Academic Minor Project'
    },

  

  ];

  staticProjects = [...this.projects];

  loadProjects() {
    this.http.get(this.api('/projects')).subscribe({
      next: (res: any) => {

        const apiData = (res || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          imageUrl: p.imageurl,
          projectUrl: p.projecturl,
          workedUnder: p.workedunder
        }));

        // ✅ MERGE (NEW + OLD)
        this.projects = [
          ...apiData.sort((a: any, b: any) => b.id - a.id), // newest first
          ...this.staticProjects
        ];
      },
      error: () => {
        this.projects = [...this.staticProjects];
      }
    });
  }

}

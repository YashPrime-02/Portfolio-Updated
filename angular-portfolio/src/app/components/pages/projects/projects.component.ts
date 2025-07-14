import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Sion Varsity Website',
      description: 'Developed SionVarsity.com as an Angular Developer for EUODIAS Technologies, focusing on responsive design, improved UI/UX, and performance optimization. Enhanced user engagement and ensured seamless navigation, contributing to a scalable and efficient web platform.',
      imageUrl: '/assets/Gifs/ezgif-49153735468cb3.gif',
      projectUrl: 'https://sionvarsity.com/',
      workedUnder: 'EUODIAS Technologies'
    },
    // {
    //   title: 'Sion Semi AI',
    //   description: 'Developed and optimized sionsemi.ai using Angular, focusing on responsive design, performance enhancements, and seamless user experience. Collaborated with cross-functional teams to implement scalable solutions and ensure smooth deployment.',
    //   imageUrl: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/circuit-3.svg',
    //   projectUrl: 'https://sionsemi.ai/',
    //   workedUnder: 'EUODIAS Technologies'
    // },
    {
      title: 'Doctor Helper Portal',
      description: 'Built Doctor Helper, a full-stack web app for booking doctor appointments. Used Django for secure backend, SQLite for data management, and responsive frontend with  HTML, CSS, Bootstrap. Ensured smooth user flow, authentication, and real-time scheduling.',
      imageUrl: '/assets/Gifs/Mr Bean Thumbs Up GIF.gif',
      projectUrl: 'https://github.com/YashPrime-02/Doctor_Helper',
      workedUnder: 'Academic Minor Project'
    },
    {
      title: 'E-CELL WEBSITE',
      description: 'Conceptualized, built, and coordinated the official website for E-CELL using React, providing a dynamic and engaging platform for event announcements, team showcases, and entrepreneurial resources that are required for students and integral on the basis of world.',
      imageUrl: '/assets/Gifs/ezgif-227f0475b4023c.gif',
      projectUrl: 'https://ecell-website-v2.vercel.app/',
      workedUnder: 'E-CELL ABESEC TEAM'
    },
    {
      title: 'Todo Using React + Context API',
      description: 'Designed and developed a modern Todo App using React and Context API, aimed at enhancing productivity through features like priority tagging, filters, edit mode, and localStorage persistence, wrapped in a sleek glassmorphic UI.',
      imageUrl: '/assets/Gifs/ezgif-4a402e74fe3d73.gif',
      projectUrl: 'https://startling-belekoy-120061.netlify.app/',
      workedUnder: 'Academic Major Project'
    },
    {
      title: 'Budget Planner App',
      description: 'Developed a Budget Planner App using AngularJS, enabling users to track expenses, set financial goals, and manage budgets effectively with responsive design and intuitive user-friendly interface with easy to navigate website.',
      imageUrl: '/assets/Gifs/giphy.gif',
      projectUrl: 'https://github.com/YashPrime-02/Yash-Angular-Projects/tree/main/BudgetPlanner_App',
      workedUnder: 'Self Project'
    },
    {
      title: 'Unofficial IRCTC Improvised Clone Site',
      description: 'Developed an unofficial IRCTC Improvised Clone Site using AngularJS, replicating core functionalities like train search, booking, and PNR status, with enhanced UI/UX, improved performance.',
      imageUrl: '/assets/Gifs/Train Station Racing GIF by Burger Records.gif',
      projectUrl: 'https://github.com/YashPrime-02/IRCTC-IMPROVISED-CLONE',
      workedUnder: 'Self Project'
    }
  ];
}

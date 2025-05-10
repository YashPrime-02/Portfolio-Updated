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
      imageUrl: '/assets/SION-VARSITY.png',
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
      imageUrl: '/assets/Doctor_Helper.png',
      projectUrl: 'https://github.com/YashPrime-02/Doctor_Helper',
      workedUnder: 'Academic Minor Project'
    },
    {
      title: 'E-CELL WEBSITE',
      description: 'Conceptualized, built, and coordinated the official website for E-CELL using React, providing a dynamic and engaging platform for event announcements, team showcases, and entrepreneurial resources that are required for students and integral on the basis of world.',
      imageUrl: '/assets/E-CELL-ABESEC.png',
      projectUrl: 'https://ecell-website-v2.vercel.app/',
      workedUnder: 'E-CELL ABESEC TEAM'
    },
    {
      title: 'Mental Health Portal',
      description: 'Designed and developed a comprehensive Mental Health Portal as the major project for the final year, aimed at promoting mental health and well-being through accessible resources and interactive features which are helpful.',
      imageUrl: '/assets/MENTAL-HEALTH-1.jpg',
      projectUrl: 'https://github.com/YashPrime-02/Mental_Health_Portal-Main',
      workedUnder: 'Academic Major Project'
    },
    {
      title: 'Budget Planner App',
      description: 'Developed a Budget Planner App using AngularJS, enabling users to track expenses, set financial goals, and manage budgets effectively with responsive design and intuitive user-friendly interface with easy to navigate website.',
      imageUrl: '/assets/Budget-Planner.jpg',
      projectUrl: 'https://github.com/YashPrime-02/Yash-Angular-Projects/tree/main/BudgetPlanner_App',
      workedUnder: 'Self Project'
    },
    {
      title: 'Unofficial IRCTC Improvised Clone Site',
      description: 'Developed an unofficial IRCTC Improvised Clone Site using AngularJS, replicating core functionalities like train search, booking, and PNR status, with enhanced UI/UX, improved performance.',
      imageUrl: '/assets/IRCTC.png',
      projectUrl: 'https://github.com/YashPrime-02/IRCTC-IMPROVISED-CLONE',
      workedUnder: 'Self Project'
    }
  ];
}

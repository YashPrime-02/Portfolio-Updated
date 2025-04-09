import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true, // ✅
  imports: [CommonModule], // ✅ Import here
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Sion Varsity',
      description: 'Developed SionVarsity.com as an Angular Developer, focusing on responsive design, improved UI/UX, and performance optimization. Enhanced user engagement and ensured seamless navigation, contributing to a scalable and efficient web platform.',
      imageUrl: '/assets/SION_VARSITY.png', // Website globe icon
      projectUrl: 'https://sionvarsity.com/'
    },
    {
      title: 'Sion Semi AI',
      description: 'Developed and optimized sionsemi.ai using Angular, focusing on responsive design, performance enhancements, and seamless user experience. Collaborated with cross-functional teams to implement scalable solutions and ensure smooth deployment.',
      imageUrl: '/assets/SIONSEMI_AI.png',
      projectUrl: 'https://sionsemi.ai/'
    },
    {
      title: 'Doctor Helper',
      description: 'Built Doctor Helper, a full-stack web app for booking doctor appointments. Used Django for secure backend, SQLite for data management, and responsive frontend with HTML, CSS, Bootstrap. Ensured smooth user flow, authentication, and real-time scheduling.',
      imageUrl: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/stethoscope.svg', // Doctor / health icon
      projectUrl: 'https://github.com/YashPrime-02/Doctor_Helper'
    },
    {
      title: 'E-CELL WEBSITE',
      description: 'Conceptualized, built, and coordinated the official website for E-CELL using React, providing a dynamic and engaging platform for event announcements, team showcases, and entrepreneurial resources.',
      imageUrl: '/assets/E-CELL_ABESEC.png', // Startup / rocket icon
      projectUrl: ''
    },
    {
      title: 'Mental Health Portal',
      description: 'Designed and developed a comprehensive Mental Health Portal as the major project for the final year, aimed at promoting mental well-being through accessible resources and interactive features.',
      imageUrl: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/brain.svg', // Mental health / brain icon
      projectUrl: 'https://github.com/YashPrime-02/Mental_Health_Portal-Main'
    },
    {
      title: 'Budget Planner App ',
      description: 'Developed a Budget Planner App using AngularJS, enabling users to track expenses, set financial goals, and manage budgets effectively with responsive design and intuitive user-friendly interface.',
      imageUrl: 'https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/piggy-bank.svg', // Budget / finance icon
      projectUrl: 'https://github.com/YashPrime-02/Yash-Angular-Projects/tree/main/BudgetPlanner_App'
    }
  ];

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
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
    description: 'Developed SionVarsity.com as an Angular Developer for EUODIAS Technologies, delivering a feature-rich, responsive educational platform optimized for various devices and screen sizes. Implemented modern UI/UX principles with clean layouts, intuitive navigation, and interactive components to enhance student, faculty, and admin engagement. Integrated dynamic content modules, secure authentication, and role-based access control to ensure a personalized user experience and functionality',
    imageUrl: '/assets/Gifs/ezgif-49153735468cb3.gif',
    projectUrl: 'https://sionvarsity.com/',
    workedUnder: 'EUODIAS Technologies'
  },

  {
    title: 'TaskFlow – Team Task Manager & Performance Tracker',
    description: 'Designed and developed a modern team management and performance tracking application using React, Implemented task assignment, status updates, filtering, and real-time UI state management using Context API and localStorage persistence. Integrated interactive performance charts, clean modular component architecture, and smooth UI animations to deliver a scalable, production-style dashboard experience.',
    imageUrl: '/assets/task-manager.webp',
    projectUrl: 'https://github.com/YashPrime-02/Taskflow-App',
    workedUnder: 'Self Project'
  },

  {
    title: 'REST API Admin Panel & Backend Management System',
    description: 'Designed and developed a secure RESTful API–driven admin panel using Node.js, Express, and MySQL, providing full CRUD operations, Implemented modular backend architecture, request validation Built for scalability, maintainability, and real-world backend workflows with clean API design and structured error handling.',
    imageUrl: '/assets/admin-management-tools.webp',
    projectUrl: 'https://github.com/YashPrime-02/REST-API-Admin-Panel',
    workedUnder: 'Self Project'
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
    title: 'YOMATO – Online Food Delivery Web Application',
    description: 'Designed and developed a fully responsive online food delivery web application using React JS, featuring dynamic restaurant listings, interactive menus, cart management, and smooth user navigation. Implemented component-based architecture, reusable UI components, and clean routing to ensure scalability and performance. Focused on  mobile-first responsiveness.',
    imageUrl: '/assets/yomato.gif',
    projectUrl: 'https://github.com/YashPrime-02/Food-Delivary-App',
    workedUnder: 'Self Project',
    liveUrl: 'https://food-delivary-app-jet.vercel.app/'
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
    description: 'Designed and developed a modern Todo App using React and Context API, aimed at enhancing productivity through features like priority tagging, filters, edit mode, and localStorage persistence, wrapped in a sleek glassmorphic UI and having good local storage logic.',
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
  }

];

}

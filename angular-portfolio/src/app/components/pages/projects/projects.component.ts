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
      title: 'Project 1',
      description: 'Description of project one.',
      imageUrl: 'assets/images/project1.jpg',
      projectUrl: ''
    },
    {
      title: 'Project 2',
      description: 'Description of project one.',
      imageUrl: 'assets/images/project1.jpg',
      projectUrl: ''
    },
    {
      title: 'Project 3',
      description: 'Description of project two.',
      imageUrl: 'assets/images/project2.jpg',
      projectUrl: ''
    },
    {
      title: 'Project 4',
      description: 'Description of project two.',
      imageUrl: 'assets/images/project2.jpg',
      projectUrl: ''
    },
    {
      title: 'Project 5',
      description: 'Description of project two.',
      imageUrl: 'assets/images/project2.jpg',
      projectUrl: ''
    },
    {
      title: 'Project 6',
      description: 'Description of project two.',
      imageUrl: 'assets/images/project2.jpg',
      projectUrl: ''
    },
    // Add more projects as needed
  ];
}

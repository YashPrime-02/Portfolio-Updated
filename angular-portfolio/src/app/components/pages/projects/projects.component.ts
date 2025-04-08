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
      title: 'Project One',
      description: 'Description of project one.',
      imageUrl: 'assets/images/project1.jpg',
      projectUrl: 'https://github.com/yourusername/project-one'
    },
    {
      title: 'Project Two',
      description: 'Description of project two.',
      imageUrl: 'assets/images/project2.jpg',
      projectUrl: 'https://github.com/yourusername/project-two'
    }
    // Add more projects as needed
  ];
}

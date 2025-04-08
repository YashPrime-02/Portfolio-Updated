import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
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

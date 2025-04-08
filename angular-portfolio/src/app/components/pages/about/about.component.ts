import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  // Technologies data
  technologies = [
    { name: 'Angular Js', icon: 'assets/icons/angular.svg' },
    { name: 'React Js', icon: 'assets/icons/react.svg' },
    { name: 'CSS', icon: 'assets/icons/css.svg' },
    { name: 'JavaScript', icon: 'assets/icons/javascript.svg' },
    { name: 'Node.js', icon: 'assets/icons/nodejs.svg' },
    { name: 'Github', icon: 'assets/icons/git.svg' },
  ];

  // Testimonials data
  testimonials = [
    {
      name: 'John Doe',
      message: 'Yash is an exceptional developer. His work on the front-end was amazing.',
      image: 'assets/images/john_doe.jpg'
    },
    {
      name: 'Jane Smith',
      message: 'I highly recommend Yash for any web development work. He delivers quality.',
      image: 'assets/images/jane_smith.jpg'
    },
    {
      name: 'Michael Johnson',
      message: 'A dedicated professional who brings both creativity and technical expertise.',
      image: 'assets/images/michael_johnson.jpg'
    },
  ];
}

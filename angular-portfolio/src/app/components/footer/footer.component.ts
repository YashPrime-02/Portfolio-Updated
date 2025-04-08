import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Variable to handle the theme toggle (light/dark mode)
  isDarkTheme: boolean = false;

  // Toggle theme between light and dark
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme'); // Add dark theme class to the body
    } else {
      document.body.classList.remove('dark-theme'); // Remove dark theme class from the body
    }
  }

  // Handle mobile menu visibility toggle
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('active', this.menuOpen); // Toggle active class for mobile menu visibility
    }
  }

  // Footer data - You can extend this with dynamic content
  footerLinks = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Projects', url: '/projects' },
    { name: 'Contact', url: '/contact' }
  ];

  socialLinks = [
    { icon: 'fa fa-facebook', url: 'https://facebook.com' },
    { icon: 'fa fa-twitter', url: 'https://twitter.com' },
    { icon: 'fa fa-linkedin', url: 'https://linkedin.com' },
    { icon: 'fa fa-github', url: 'https://github.com/YashPrime-02' }
  ];
}

import { RouterModule } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule],
})
export class HeaderComponent implements OnInit {
  lastScrollTop = 0;
  isDarkMode = false;

  ngOnInit() {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';

    this.updateThemeClass();
  }

  // Update theme class on body based on current mode
  private updateThemeClass() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  // Toggle mobile menu
  toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    menuToggle?.classList.toggle('active');
    navbar?.classList.toggle('active');
  }

  // Toggle theme (dark/light)
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateThemeClass();
    console.log('Theme switched to:', this.isDarkMode ? 'dark' : 'light');
  }


  // Scroll behavior for header animation
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add or remove scrolled class
    navbar.classList.toggle('scrolled', scrollTop > 50);

    // Show/hide navbar on scroll direction
    if (scrollTop > this.lastScrollTop) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }

    this.lastScrollTop = Math.max(0, scrollTop);
  }
}

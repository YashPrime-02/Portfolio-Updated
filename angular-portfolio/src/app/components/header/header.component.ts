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
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.updateThemeClass();
  }

  private updateThemeClass() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    menuToggle?.classList.toggle('active');
    navbar?.classList.toggle('active');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateThemeClass();
    console.log('Theme switched to:', this.isDarkMode ? 'dark' : 'light');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (!navbar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Toggle shadow on scroll
    navbar.classList.toggle('scrolled', scrollTop > 50);

    // Hide/show on scroll direction
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    this.lastScrollTop = Math.max(0, scrollTop);
  }
}

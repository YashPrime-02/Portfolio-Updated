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
  menuOpen = false;

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
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (!navbar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show on scroll direction
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    this.lastScrollTop = Math.max(0, scrollTop);
  }
}

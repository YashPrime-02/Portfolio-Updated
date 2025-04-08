import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent} from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'; // ✅ Check your path
import { CommonModule } from '@angular/common'; // ✅ Safe to import

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent], // ✅ Imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

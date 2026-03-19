import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient) {}

  // ===== UI STATE =====
  showPassword = false;
  isLoggedIn = false;
  password = '';

  activeTab: 'project' | 'testimonial' | 'resume' = 'project';
  toastMessage = '';

  loading = {
    login: false,
    project: false,
    testimonial: false,
    resume: false
  };

  token = '';

  // ===== DATA =====
  project: any = {};
  testimonial: any = {};

  projects: any[] = [];
  testimonials: any[] = [];

  // ✅ FIXED TYPES
  editingProjectId: number | null = null;
  editingTestimonialId: number | null = null;

  resumeUrl = '';

  // ===== HELPERS =====
  private api(path: string) {
    return `${environment.apiBase}${path}`;
  }

  showToast(message: string) {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = ''), 2500);
  }

  ngOnInit() {
    const token = localStorage.getItem('adminToken');

    if (token) {
      this.token = token;
      this.isLoggedIn = true;

      this.loadProjects();
      this.loadTestimonials();
      this.loadSettings(); // ✅ ADDED
    }
  }

  getAuthHeaders() {
  const token = this.token || localStorage.getItem('adminToken');

  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
}

  // ===== LOGIN =====
  login() {
    if (!this.password) {
      this.showToast('Enter password ⚠️');
      return;
    }

    this.loading.login = true;

    this.http.post(this.api('/admin/login'), {
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.loading.login = false;

        if (res?.success) {
          this.token = res.token;
          localStorage.setItem('adminToken', this.token);
          this.isLoggedIn = true;

          this.loadProjects();
          this.loadTestimonials();
          this.loadSettings(); // ✅ ADDED

          this.showToast('Welcome 👋');
        }
      },
      error: (err) => {
        this.loading.login = false;

        if (err.status === 401) {
          this.showToast('Wrong password ❌');
        } else {
          this.showToast('Server error ❌');
        }
      }
    });
  }

  // ===== LOAD DATA =====
  loadProjects() {
    this.http.get(this.api('/projects')).subscribe({
      next: (res: any) => this.projects = res || [],
      error: () => this.showToast('Failed to load projects ❌')
    });
  }

  loadTestimonials() {
    this.http.get(this.api('/testimonials')).subscribe({
      next: (res: any) => this.testimonials = res || [],
      error: () => this.showToast('Failed to load testimonials ❌')
    });
  }

  // ✅ NEW
  loadSettings() {
    this.http.get(this.api('/settings')).subscribe({
      next: (res: any) => {
        this.resumeUrl = res?.resumeUrl || '';
      },
      error: () => this.showToast('Failed to load resume ❌')
    });
  }

  logout() {
    this.token = '';
    this.isLoggedIn = false;
    localStorage.removeItem('adminToken');
    this.showToast('Logged out 👋');
  }

  // ===== PROJECT CRUD =====
  addProject() {
    if (!this.project.title || !this.project.description) {
      this.showToast('Title & Description required ⚠️');
      return;
    }

    this.loading.project = true;

    const req = this.editingProjectId
      ? this.http.put(this.api(`/projects/${this.editingProjectId}`), this.project, this.getAuthHeaders())
      : this.http.post(this.api('/projects'), this.project, this.getAuthHeaders());

    req.subscribe({
      next: () => {
        this.loading.project = false;
        this.project = {};
        this.editingProjectId = null;
        this.loadProjects();
        this.showToast('Saved ✅');
      },
      error: () => {
        this.loading.project = false;
        this.showToast('Failed ❌');
      }
    });
  }

  editProject(p: any) {
    this.project = { ...p };
    this.editingProjectId = p.id;
  }

  deleteProject(id: number) {
  this.http.delete(this.api(`/projects/${id}`), this.getAuthHeaders())
    .subscribe({
      next: () => {
        this.loadProjects();
        this.showToast('Deleted 🗑️');
      },
      error: () => this.showToast('Delete failed ❌')
    });
}
  // ===== TESTIMONIAL CRUD =====
  addTestimonial() {
    if (!this.testimonial.name || !this.testimonial.message) {
      this.showToast('Name & Message required ⚠️');
      return;
    }

    this.loading.testimonial = true;

    const req = this.editingTestimonialId
      ? this.http.put(this.api(`/testimonials/${this.editingTestimonialId}`), this.testimonial, this.getAuthHeaders())
      : this.http.post(this.api('/testimonials'), this.testimonial, this.getAuthHeaders());

    req.subscribe({
      next: () => {
        this.loading.testimonial = false;
        this.testimonial = {};
        this.editingTestimonialId = null;
        this.loadTestimonials();
        this.showToast('Saved ✅');
      },
      error: () => {
        this.loading.testimonial = false;
        this.showToast('Failed ❌');
      }
    });
  }

  editTestimonial(t: any) {
    this.testimonial = { ...t };
    this.editingTestimonialId = t.id;
  }

 deleteTestimonial(id: number) {
  this.http.delete(this.api(`/testimonials/${id}`), this.getAuthHeaders())
    .subscribe({
      next: () => {
        this.loadTestimonials();
        this.showToast('Deleted 🗑️');
      },
      error: () => this.showToast('Delete failed ❌')
    });
}
  // ===== RESUME =====
  updateResume() {
    if (!this.resumeUrl) {
      this.showToast('Enter resume link ⚠️');
      return;
    }

    this.loading.resume = true;

    this.http.post(this.api('/settings'), {
      resumeUrl: this.resumeUrl
    }, this.getAuthHeaders())
      .subscribe({
        next: () => {
          this.loading.resume = false;
          this.showToast('Updated ✅');
        },
        error: () => {
          this.loading.resume = false;
          this.showToast('Failed ❌');
        }
      });
  }
}
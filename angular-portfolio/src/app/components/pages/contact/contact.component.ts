import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import AOS from 'aos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], // optional
      message: ['', Validators.required],
    });



  }

  ngOnInit(): void {
    AOS.init();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = new FormData();
      formData.append('entry.1234567890', this.contactForm.value.name); // ✅ Update with your Google Form field IDs
      formData.append('entry.0987654321', this.contactForm.value.email);
      formData.append('entry.1122334455', this.contactForm.value.message);

      fetch('https://docs.google.com/forms/u/0/d/e/your-form-id/formResponse', { // ✅ Replace with your form ID
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      }).then(() => {
        Swal.fire('Success!', 'Your message has been sent.', 'success');
        this.downloadSubmission();
        this.contactForm.reset();
      }).catch(() => {
        Swal.fire('Oops!', 'Something went wrong. Try again later.', 'error');
        window.location.href = `mailto:youremail@example.com?subject=Contact Form Submission&body=Name: ${this.contactForm.value.name}%0AEmail: ${this.contactForm.value.email}%0AMessage: ${this.contactForm.value.message}`;
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  downloadSubmission(): void {
    const { name, email, message } = this.contactForm.value;
    const content = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ContactFormSubmission.txt';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

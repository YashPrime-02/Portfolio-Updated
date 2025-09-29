import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  title: any;
  meta: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    // 🔹 SEO Meta Tags
    this.title.setTitle('Contact | Yash Mishra Portfolio');
    this.meta.updateTag({ name: 'description', content: 'Get in touch with Yash Mishra for collaborations, job opportunities, or project discussions.' });
    this.meta.updateTag({ property: 'og:title', content: 'Contact | Yash Mishra Portfolio' });
    this.meta.updateTag({ property: 'og:description', content: 'Reach out to Yash Mishra via the contact form for software development projects and opportunities.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://portfolio-updated-lwhs.vercel.app/contact' });
  }
  initForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      projectDescription: [''],
      message: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    // Form is valid - implement your form submission logic here
    console.log('Form submitted successfully', this.contactForm.value);

    // You would typically call a service to send the message
    // this.contactService.sendMessage(this.contactForm.value).subscribe(...)

    // Reset form after successful submission
    this.contactForm.reset();
    this.submitted = false;

    // Could show a success message to the user
    alert('Your message has been sent successfully!');
  }
}

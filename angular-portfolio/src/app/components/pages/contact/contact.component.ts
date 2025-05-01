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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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

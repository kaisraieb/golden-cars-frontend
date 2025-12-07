import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name = '';
  email = '';
  phone = '';
  subject = '';
  message = '';
  submitted = false;

  onSubmit() {
    if (!this.name || !this.email || !this.message) {
      return;
    }

    // Here you would typically send this to your backend
    console.log('Contact form submitted:', {
      name: this.name,
      email: this.email,
      phone: this.phone,
      subject: this.subject,
      message: this.message
    });

    this.submitted = true;
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.subject = '';
      this.message = '';
      this.submitted = false;
    }, 3000);
  }
}


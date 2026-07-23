---
layout: page
title: "Get In Touch"
subtitle: "Have a question, feedback, or a project in mind? Reach out!"
permalink: /contact/
---

If you'd like to collaborate, discuss a project, or simply say hello, please fill out the form below. I do my best to respond to all inquiries within 24-48 hours.

<form class="contact-form" id="contact-form" action="#" method="POST" onsubmit="event.preventDefault(); alert('Thank you! Your message has been sent successfully (mock action).'); this.reset();">
  <div class="form-grid">
    <div class="form-group">
      <label for="contact-name">Your Name</label>
      <input type="text" id="contact-name" name="name" placeholder="Alex Morgan" required>
    </div>
    <div class="form-group">
      <label for="contact-email">Email Address</label>
      <input type="email" id="contact-email" name="email" placeholder="alex@example.com" required>
    </div>
    <div class="form-group form-group-full">
      <label for="contact-subject">Subject</label>
      <input type="text" id="contact-subject" name="subject" placeholder="Collaboration or Project Idea" required>
    </div>
    <div class="form-group form-group-full">
      <label for="contact-message">Message</label>
      <textarea id="contact-message" name="message" placeholder="Hi! I wanted to check in about..." required></textarea>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Send Message</button>
</form>

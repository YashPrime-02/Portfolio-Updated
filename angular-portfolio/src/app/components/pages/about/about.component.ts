import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  quotes = [
    { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs' },
    { text: 'Good design is obvious. Great design is transparent.', author: 'Joe Sparano' },
    { text: 'Websites promote you 24/7: No employee will do that.', author: 'Paul Cookson' },
    { text: 'Leadership is not about a title or a designation. It’s about impact, influence, and inspiration.', author: 'Robin S. Sharma' },
    { text: 'The details are not the details. They make the design.', author: 'Charles Eames' },
    { text: 'A leader is one who knows the way, goes the way, and shows the way.', author: 'John C. Maxwell' }
  ];

  currentQuote = '';
  currentAuthor = '';
  private typingIndex = 0;
  private fullText = '';
  private intervalId: any;
  private typingSpeed = 50; // ms per character
  isPaused = false;

  constructor() {}

  ngOnInit(): void {
    this.shuffleQuotes();
    this.displayNewQuote();
  }

  shuffleQuotes(): void {
    this.quotes.sort(() => Math.random() - 0.5);
  }

  displayNewQuote(): void {
    const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.fullText = randomQuote.text;
    this.currentAuthor = randomQuote.author;
    this.currentQuote = '';
    this.typingIndex = 0;

    this.typeQuote();
  }

  typeQuote(): void {
    if (this.typingIndex < this.fullText.length) {
      if (!this.isPaused) {
        this.currentQuote += this.fullText.charAt(this.typingIndex);
        this.typingIndex++;
      }

      this.intervalId = setTimeout(() => this.typeQuote(), this.typingSpeed);
    } else {
      // Wait 3 seconds, then show new quote
      this.intervalId = setTimeout(() => this.displayNewQuote(), 3000);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isPaused = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isPaused = false;
  }

}

import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  quotes = [
    { text: 'Websites promote you 24/7: No employee will do that.', author: 'Paul Cookson' },
    { text: 'Leadership is not about a title or a designation. It’s about impact, influence, and inspiration.', author: 'Robin S. Sharma' },
    { text: 'A leader is one who knows the way, goes the way, and shows the way.', author: 'John C. Maxwell' },
    { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
    { text: 'JavaScript is the duct tape of the Internet.', author: 'Charlie Campbell' },
    { text: 'Code is like humor. When you have to explain it, it’s bad.', author: 'Cory House' },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler' }
  ];


  currentQuote = '';
  currentAuthor = '';
  private typingIndex = 0;
  private fullText = '';
  private intervalId: any;
  private typingSpeed = 70;
  isPaused = false;
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.shuffleQuotes();
    const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.fullText = randomQuote.text;
    this.currentAuthor = randomQuote.author;

    if (this.isBrowser) {
      this.currentQuote = '';
      this.typingIndex = 0;
      this.typeQuote();
    } else {
      // Static quote for SSR
      this.currentQuote = this.fullText;
    }
  }

  shuffleQuotes(): void {
    this.quotes.sort(() => Math.random() - 0.5);
  }

  typeQuote(): void {
    if (this.typingIndex < this.fullText.length) {
      if (!this.isPaused) {
        this.currentQuote += this.fullText.charAt(this.typingIndex);
        this.typingIndex++;
      }

      if (this.isBrowser) {
        this.intervalId = setTimeout(() => this.typeQuote(), this.typingSpeed);
      }
    } else {
      if (this.isBrowser) {
        this.intervalId = setTimeout(() => this.displayNewQuote(), 3000);
      }
    }
  }

  displayNewQuote(): void {
    const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.fullText = randomQuote.text;
    this.currentAuthor = randomQuote.author;
    this.currentQuote = '';
    this.typingIndex = 0;

    if (this.isBrowser) {
      this.typeQuote();
    }
  }

  // @HostListener('mouseenter')
  // onMouseEnter() {
  //   this.isPaused = true;
  // }

  // @HostListener('mouseleave')
  // onMouseLeave() {
  //   this.isPaused = false;
  // }
}

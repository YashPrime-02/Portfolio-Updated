import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import gsap from 'gsap';

const texts = [
  "Loading assets...",
  "Preparing animations...",
  "Setting up components...",
  "Optimizing performance...",
  "Loading your portfolio..."
];

let currentTextIndex = 0;
const loaderTextElement = document.querySelector('.loader-text') as HTMLElement;
const loaderPercentageElement = document.querySelector('.loader-percentage') as HTMLElement;
const loaderProgressElement = document.querySelector('.loader-progress') as HTMLElement;

// Text transition function with fade
function rotateText() {
  if (!loaderTextElement) return;
  gsap.to(loaderTextElement, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      loaderTextElement.textContent = texts[currentTextIndex];
      gsap.to(loaderTextElement, { opacity: 1, duration: 0.3 });
    }
  });
}

function preloadImages(images: string[]) {
  let loaded = 0;
  const total = images.length;

  return new Promise<void>((resolve) => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === total) resolve();
      };
    });
  });
}

// Example images (replace with your assets!)
const imagesToPreload = [
  'assets/images/image1.jpg',
  'assets/images/image2.jpg',
  'assets/images/image3.png',
];

let fakeProgress = 0;
const totalDuration = 8000; // total loader time in ms (8 seconds for premium feel)
const intervalTime = 100;
const steps = totalDuration / intervalTime;

const progressIncrement = 100 / steps;

const intervalId = setInterval(() => {
  fakeProgress = Math.min(fakeProgress + progressIncrement, 99); // keep it under 100 until done
  loaderPercentageElement.textContent = `${Math.floor(fakeProgress)}%`;
  loaderProgressElement.style.width = `${fakeProgress}%`;

  if (Math.floor(fakeProgress) % 20 === 0) { // text change every ~20%
    rotateText();
  }

  if (fakeProgress >= 99) {
    clearInterval(intervalId);
  }
}, intervalTime);

Promise.all([preloadImages(imagesToPreload)])
  .then(() => {
    clearInterval(intervalId);
    loaderPercentageElement.textContent = `100%`;
    loaderProgressElement.style.width = `100%`;

    // GSAP smooth fade out
    gsap.to('#loader-wrapper', {
      opacity: 0,
      duration: 2,
      onComplete: () => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) loader.style.display = 'none';
      }
    });
  })
  .finally(() => {
    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
  });

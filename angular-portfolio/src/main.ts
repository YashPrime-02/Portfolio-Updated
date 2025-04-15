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

const imagesToPreload = [
  'assets/images/image1.jpg',
  'assets/images/image2.jpg',
  'assets/images/image3.png',
];

document.addEventListener('DOMContentLoaded', () => {
  const loaderTextElement = document.querySelector('.loader-text') as HTMLElement;
  const loaderPercentageElement = document.querySelector('.loader-percentage') as HTMLElement;
  const loaderProgressElement = document.querySelector('.loader-progress') as HTMLElement;
  const loaderWrapper = document.getElementById('loader-wrapper');

  if (!loaderTextElement || !loaderPercentageElement || !loaderProgressElement || !loaderWrapper) {
    console.error('Loader elements not found!');
    bootstrapApplication(AppComponent, appConfig)
      .catch(err => console.error(err));
    return;
  }

  let currentTextIndex = 0;
  let fakeProgress = 0;
  const totalDuration = 8000; // 8s for premium feel
  const intervalTime = 100;
  const steps = Math.floor(totalDuration / intervalTime);
  const progressIncrement = 100 / steps;
  const textChangeInterval = Math.floor(steps / texts.length);
  let currentStep = 0;

  function rotateText() {
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
    return new Promise<void>((resolve) => {
      let loaded = 0;
      const total = images.length;

      if (total === 0) resolve();

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

  const intervalId = setInterval(() => {
    fakeProgress = Math.min(fakeProgress + progressIncrement, 99);
    loaderPercentageElement.textContent = `${Math.floor(fakeProgress)}%`;
    loaderProgressElement.style.width = `${fakeProgress}%`;

    currentStep++;
    if (currentStep % textChangeInterval === 0) {
      rotateText();
    }

    if (fakeProgress >= 99) {
      clearInterval(intervalId);
    }
  }, intervalTime);

  preloadImages(imagesToPreload).then(() => {
    clearInterval(intervalId);
    loaderPercentageElement.textContent = `100%`;
    loaderProgressElement.style.width = `100%`;

    gsap.to(loaderWrapper, {
      opacity: 0,
      duration: 1.5,
      onComplete: () => {
        loaderWrapper.style.display = 'none';

        // Now bootstrap
        bootstrapApplication(AppComponent, appConfig)
          .catch(err => console.error(err));
      }
    });
  });
});

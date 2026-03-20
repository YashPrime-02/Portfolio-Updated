import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import gsap from 'gsap';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

// 🔥 COMMON PROVIDERS
const sharedProviders = [
  provideAnimations(),
  provideRouter(
    routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled'
    })
  )
];

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

  // 🔹 Raw query
  const loaderTextEl = document.querySelector('.loader-text');
  const loaderPercentEl = document.querySelector('.loader-percentage');
  const loaderProgressEl = document.querySelector('.loader-progress');
  const loaderWrapper = document.getElementById('loader-wrapper');

  // ✅ FALLBACK (no loader present)
  if (!loaderTextEl || !loaderPercentEl || !loaderProgressEl || !loaderWrapper) {
    console.warn('Loader not found → bootstrapping directly');

    bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        ...(appConfig.providers ?? []),
        ...sharedProviders
      ]
    }).catch(err => console.error(err));

    return;
  }

  // ✅ SAFE TYPED ELEMENTS (CRITICAL FIX)
  const loaderTextElement = loaderTextEl as HTMLElement;
  const loaderPercentageElement = loaderPercentEl as HTMLElement;
  const loaderProgressElement = loaderProgressEl as HTMLElement;

  let currentTextIndex = 0;
  let fakeProgress = 0;

  const totalDuration = 8000;
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

        gsap.to(loaderTextElement, {
          opacity: 1,
          duration: 0.3
        });
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

        bootstrapApplication(AppComponent, {
          ...appConfig,
          providers: [
            ...(appConfig.providers ?? []),
            ...sharedProviders
          ]
        }).catch(err => console.error(err));
      }
    });
  });

});
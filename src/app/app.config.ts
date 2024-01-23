import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ringoffire-9f32a","appId":"1:612641501820:web:2bb0a4a691d6b1d06b4ff9","storageBucket":"ringoffire-9f32a.appspot.com","apiKey":"AIzaSyBdx5ASA9GEx-GLdc_6meDQ7dAoZPLeFPc","authDomain":"ringoffire-9f32a.firebaseapp.com","messagingSenderId":"612641501820"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};

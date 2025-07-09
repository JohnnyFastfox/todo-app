import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(FormsModule),
    ...(appConfig.providers ?? [])
  ]
}).catch(err => console.error(err));
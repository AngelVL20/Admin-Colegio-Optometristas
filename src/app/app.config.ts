import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

export const appConfig = {
  providers: [
    importProvidersFrom(CommonModule),
    provideRouter([]) // sin rutas por ahora
  ]
};

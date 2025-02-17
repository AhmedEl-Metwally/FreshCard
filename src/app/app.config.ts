import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
//import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { api_url } from './core/custom_injections/api_url';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withHashLocation(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
      ),
      provideClientHydration(withEventReplay()),
      provideHttpClient(withFetch()),
      importProvidersFrom([BrowserAnimationsModule]),
      {
        provide: api_url,
        useValue: 'https://ecommerce.routemisr.com/api/v1'
      }
    ]
};


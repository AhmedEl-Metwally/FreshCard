import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
//import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { api_url } from './core/custom_injections/api_url';
import { provideToastr } from 'ngx-toastr';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loodingInterceptor } from './core/interceptors/looding.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,
      withHashLocation(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
      ),
      provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor, httpErrorInterceptor, loodingInterceptor])),
    importProvidersFrom([BrowserAnimationsModule]),
      provideToastr(),
      {
        provide: api_url,
        useValue: 'https://ecommerce.routemisr.com/api/v1'
      }
    ]
};


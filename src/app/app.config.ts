import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptor/headers/headers.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptor/global loading/loader.interceptor';
import { handleErrorInterceptor } from './core/interceptor/handle-error/handle-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    provideAnimations(), // required animations providers
    provideToastr(),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withPrerendering({
      // 🔹 Exclude dynamic routes from prerendering
      renderMode: (url) => {
        if (url.startsWith('/productDetails/') || url.startsWith('/checkout/')) {
          return 'no-prerender';
        }
        return 'default';
      }
    })), provideClientHydration(withEventReplay()), provideHttpClient(withFetch(),withInterceptors([headersInterceptor,loaderInterceptor,handleErrorInterceptor])), 
    importProvidersFrom(BrowserAnimationsModule,RouterModule)  
  ]
};
function withPrerendering(arg0: {
  // 🔹 Exclude dynamic routes from prerendering
  renderMode: (url: any) => "no-prerender" | "default";
}): import("@angular/router").RouterFeatures {
  throw new Error('Function not implemented.');
}


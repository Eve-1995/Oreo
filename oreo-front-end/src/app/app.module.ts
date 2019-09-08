import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartupService } from './global/service/startup.service';
// import { NgxElectronModule } from 'ngx-electron';

export function StartupServiceFactory(startupService: StartupService): () => Promise<any> {
  return () => startupService.load();
}
const APPINIT_PROVIDERS: Provider[] = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService],
    multi: true
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    // NgxElectronModule
  ],
  bootstrap: [AppComponent],
  providers: [
    ...APPINIT_PROVIDERS,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
})
export class AppModule {
}

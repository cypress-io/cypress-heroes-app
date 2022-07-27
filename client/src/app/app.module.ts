import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ShortNumberPipe } from './utils/short-number.pipe';
import { ButtonComponent } from './components/button/button.component';
import { HeroNewComponent } from './pages/hero-new/hero-new.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { HeroEditComponent } from './pages/hero-edit/hero-edit.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ConfirmHireModalComponent } from './components/confirm-hire-modal/confirm-hire-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ModalComponent } from './components/modal/modal.component';
import { ModalContainerComponent } from './components/modal/modal-container.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroListComponent,
    HeroCardComponent,
    ShortNumberPipe,
    ButtonComponent,
    HeroNewComponent,
    HeroFormComponent,
    IconButtonComponent,
    HeroEditComponent,
    AvatarComponent,
    AlertModalComponent,
    ConfirmDeleteModalComponent,
    ConfirmHireModalComponent,
    LoginModalComponent,
    ModalComponent,
    ModalContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

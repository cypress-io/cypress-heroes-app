import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ShortNumberPipe } from './short-number.pipe';
import { ButtonComponent } from './components/button/button.component';
import { HeroNewComponent } from './pages/hero-new/hero-new.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { HeroEditComponent } from './pages/hero-edit/hero-edit.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

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
    ConfirmDeleteModalComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

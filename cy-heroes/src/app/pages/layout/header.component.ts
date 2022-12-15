import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../../../app/app-routing.module';
import { ComponentsModule } from '../../../app/components/components.module';
import { AuthService } from '../../../app/services/auth.service';
import { ModalService } from '../../../app/services/modal.service';
import { User } from '../../../app/services/models';
import { LoginModalComponent } from '../../components/login-modal/login-modal.component';

@Component({
  standalone: true,
  imports: [AppRoutingModule, ComponentsModule, BrowserModule],
  selector: 'app-header',
  template: `
    <header class="text-gray-500">
      <div class="flex justify-between max-w-6xl">
        <div>
          <a routerLink="/"
            ><img src="/assets/images/cyheroes-logo.svg" alt="Cypress Logo"
          /></a>
        </div>
        <nav class="flex gap-8">
          <app-button
            *ngIf="user && user.isAdmin"
            type="primary"
            routerLink="/heroes/new"
            >Create New Hero</app-button
          >

          <app-button *ngIf="user" type="outline" (click)="logout()">Logout</app-button>
          <app-button *ngIf="!user" type="outline" (click)="showLoginModal()">
            Login
          </app-button>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  user?: User;

  ngOnInit(): void {
    this.authService.getUser().subscribe((u) => {
      this.user = u;
    });
  }

  showLoginModal() {
    this.modalService.show(LoginModalComponent);
  }

  logout() {
    this.authService.logout();
  }
}

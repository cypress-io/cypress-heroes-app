import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/services/models';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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

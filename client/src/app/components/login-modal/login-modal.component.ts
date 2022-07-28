import {
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html'
})
export class LoginModalComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  errorMessage?: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  hideModal() {
    this.modalService.hide();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const creds = {
        username: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      this.authService
        .login(creds.username, creds.password)
        .pipe(
          catchError((err: Error) => {
            this.errorMessage = err.message;
            return of(undefined);
          })
        )
        .subscribe((result) => {
          if (result) {
            this.hideModal();
          }
        });
    }
  }
}

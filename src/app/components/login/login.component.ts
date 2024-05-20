import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private auth: AuthService, private toastr: ToastrService) {}
  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  login() {
    this.auth.loginUser(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
    this.loginForm.reset();
  }

  reset() {
    this.loginForm.reset();
    this.toastr.warning('Form Cleared', 'Cleared');
  }
}

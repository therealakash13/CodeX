import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public uid?: boolean;
  private id?: string;
  constructor(private router: Router, private toastr: ToastrService) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.id = user.uid;
        this.uid = true;
      } else {
        this.uid = false;
      }
    });
  }

  getUid() {
    return this.id;
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.toastr.success('User Successfully Registered', 'Ready to Login', {
          closeButton: true,
        });
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.error('Error Signing Up', 'Failed', { closeButton: true });
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.toastr.success('User Successfully Logged In', 'Success', {
          closeButton: true,
        });
        this.router.navigateByUrl('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.error('Invalid Email or Password', 'Failed', {
          closeButton: true,
        });
      });
  }

  logoutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.toastr.warning('User Successfully Logged Out', 'Success', {
          closeButton: true,
        });
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        this.toastr.error('Error Logging Out', 'Failed', { closeButton: true });
      });
  }
}

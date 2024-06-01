import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '_@environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Optional() private auth: Auth, private router: Router) {}

  async signUpWithEmailPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      alert('Successfully signed up!');
      this.router.navigate(['/']);
    } catch (error) {
      alert(error);
    }
  }

  async loginWithEmailPassword(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      alert('Successfully logged in!');
      this.router.navigate(['/']);
    } catch (error) {
      alert(error);
    }
  }

  async sendSignInLink(email: string): Promise<void> {
    const actionCodeSettings = {
      url: 'http://localhost:4200/messages', // Update with your app's URL
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
      alert(`Sign in link was sent to ${email}`);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error) {
      alert(error);
    }
  }

  async checkSignInLink(): Promise<void> {
    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
        return;
      }
      try {
        await signInWithEmailLink(this.auth, email, window.location.href);
        this.router.navigate(['/messages']);
      } catch (error) {
        alert(error);
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error', error);
    }
  }
}

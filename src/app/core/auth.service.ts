import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  async signInWithGoogle() {
    this.auth.signInWithRedirect(new GoogleAuthProvider());
  }
  async signInWithGithub() {
    this.auth.signInWithRedirect(new GithubAuthProvider());
  }
  async signInWithEmailAndPassword(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  async signUpWithEmailAndPassword(email: string, password: string) {
    const userCredent = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredent.user?.updateProfile({
      photoURL: '../../assets/images/new_user.png',
    });
  }
}

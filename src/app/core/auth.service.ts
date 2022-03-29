import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GithubAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

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
    const { user } = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await user!.updateProfile({
      photoURL: '../../assets/images/new_user.png',
    });

    this.createUser(<User>user);
  }
  checkIfNewUser(userId: string) {
    console.log('checking user');
    return this.db
      .collection('users')
      .doc(userId)
      .get()
      .pipe(
        map((snapshot) => {
          console.log(snapshot);
          return !snapshot.exists;
        })
      );
  }
  async createUser(user: User) {
    console.log('creating user');
    await this.db.collection('users').doc(user?.uid).set({
      displayName: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
    });
  }
}

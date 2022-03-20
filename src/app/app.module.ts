import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavbarModule } from './top-navbar/top-navbar.module';
import { HomeModule } from './home/home.module';
import { StoreModule } from '@ngrx/store';
import { publicCoursesReducer } from './store/public-courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PublicCoursesEffects } from './store/public-courses.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule.enablePersistence(),
    EffectsModule.forRoot([PublicCoursesEffects]),
    StoreModule.forRoot({
      publicCourses: publicCoursesReducer,
      // privateCourses:
    }),
    TopNavbarModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

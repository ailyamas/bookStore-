import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BookComponent } from './Books/book/book.component'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { NewBookComponent } from './Books/new-book/new-book.component';
import { ViewBookComponent } from './Books/view-book/view-book.component';
import { BookService } from './Services/book.service';
import { AngularFireStorageModule} from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UImatModule } from './AngularMaterial/UImat.module';
import { AdminComponent } from './Admin/admin/admin.component';




const appRoute:Routes=[
  {path:'books',canActivate:[AuthGuardService], component:BookComponent},
  {path:'books/new-book',canActivate:[AuthGuardService], component:NewBookComponent},
  {path:'books/view-book/:id', component:ViewBookComponent},
  {path:'admin', component:AdminComponent},
  {path:'Auth/signIn',component:SignInComponent},
  {path:'Auth/signUp',component:SignUpComponent},
  {path:'',redirectTo:'books', pathMatch:'full'},
  {path:'**', redirectTo:'books'},

]

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    BookComponent,
    HeaderComponent,
    NewBookComponent,
    ViewBookComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    UImatModule
  ],
  providers: [AuthService,AuthGuardService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth:boolean;
  constructor(private authService:AuthService, 
              private auth : AngularFireAuth,
              private router:Router) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged(
      (user) => {
        if (user){
          this.isAuth = true
        }else{
          this.isAuth = false;
        }
      }
    )

  }
  onSignOut(){
    this.authService.SignOut()
    this.router.navigate(['signIn'])
  }
  

  

}

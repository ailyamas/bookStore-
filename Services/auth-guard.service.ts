import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth :AngularFireAuth, private router :Router) { }
  canActivate():Observable<boolean>|Promise<boolean>|boolean {
    return  new Promise((resolve,reject) => {
      this.auth.onAuthStateChanged(
        (user)=>{
          if (user) {
            resolve(true);
          }else{
            this.router.navigate(['Auth/signIn']);
            resolve(false)

          }
        }
      )
    })
  }
}

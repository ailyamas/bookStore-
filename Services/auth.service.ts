import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth:AngularFireAuth ) { }

  createUser(email:string,Password:string) {
    return new Promise((resolve, reject)=>{
     this.auth.createUserWithEmailAndPassword(email,Password).then(
       ()=>{
         resolve(true)
      
       },
       reject
     )
    })
  }
  SignIn(email:string,password:string) {
    return new Promise((resolve,reject)=>{
      this.auth.signInWithEmailAndPassword(email,password).then(
       ()=>{
         resolve(true)
       
       },
          reject 
      )
    }
    )
  }
SignOut(){
  this.auth.signOut();
}


}

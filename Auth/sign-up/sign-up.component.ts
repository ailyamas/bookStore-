import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup
  errorMessage: string;



  constructor(private authService:AuthService,
              private formBuilder:FormBuilder,
              private router: Router,
              ) { }


 ngOnInit(): void {
   this.Initform()
  }
Initform(){
  this.signupForm = this.formBuilder.group(
    {
      email:['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  });
}
onSubmit(){
  const email = this.signupForm.get(['email'])?.value
  const password = this.signupForm.get(['password'])?.value;
  this.authService.createUser(email, password).then(
    ()=>{
      this.router.navigate(['books'])
      
     },
     (error)=>{
       this.errorMessage=error
      }
      )

    }

  }

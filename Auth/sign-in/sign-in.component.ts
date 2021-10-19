import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  ErrorMessage: string;

  constructor(private authService:AuthService, 
              private formbuilder:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.InitForm();
  }
  InitForm(){
    this.signinForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9-Z]{6,}/)]]
    })
  }
  onSignin(){
    const email= this.signinForm.get('email')?.value;
    const password = this.signinForm.get('password')?.value;
    this.authService.SignIn(email, password).then(
      () => {
        this.router.navigate(['books']);
        console.log('succes');
      },
      (error) => {
        this.ErrorMessage = error
      }
    )

  }

}

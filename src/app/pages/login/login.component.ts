import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [undefined, Validators.required],
      password: [undefined, Validators.required]
    })
  }

  public onSubmit(){
    console.log('submit')
    if(this.loginForm.valid){
      console.log('valido')
      const response = this.sessionService.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
      if(response){
        this.sessionService.setToken(response)
        this.router.navigate(['/home'])
      }
    }
  }

}

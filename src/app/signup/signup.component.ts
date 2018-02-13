import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {IAlert, Register, RegisterErrors} from '../interfaces/register';
import {AuthService} from '../services/auth.service';

const password = new FormControl('', Validators.required);
const confirm_password = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form: FormGroup;
  model = new Register('', '', '');
  apiResponce: any;
  usernameExists = false;
  emailExists = false;
  postResp = new RegisterErrors();

  constructor(
    private fb: FormBuilder, private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group( {
      username: ['foo', Validators.compose ( [ Validators.required ] )],
      email: ['bar@foo.email' , Validators.compose ( [ Validators.required ] )],
      password: password,
      confirm_password: confirm_password
    } );
  }

  onSubmit() {
    this.authservice.signUp(this.form.value)
      .subscribe(resp => {
        this.apiResponce = resp;
        this.postResp = resp;
        if (this.postResp.token) {
          localStorage.setItem('token', this.postResp.token);
          console.log(this.postResp);
          // this.router.navigate(['/']);
          // alert(this.postResp.message);
        }
      } );
    this.usernameExists = false;
    this.emailExists = false;
  }
  onCheckUsername() {
    this.authservice.checkUsername(this.form.value.username)
      .subscribe(resp => {
        this.usernameExists = resp;
        this.postResp.username = '';
      });
  }
  onCheckEmail() {
    this.authservice.checkEmail(this.form.value.email)
      .subscribe(resp => {
        this.emailExists = resp;
        this.postResp.email = '';
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/service/login.service';
import { passwordValidator } from 'src/service/resetPasswordValidator';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.css'],
})
export class Login1Component implements OnInit {
  authenticateMessage = false;
  forgotEmployeeIDStatus = false;
  forgotEmployeeIDMessage;
  forgotEmployeeIDFlag = false;
  enableForgotPassword = false;
  enableForgotId = false;
  forgotPasswordFlag1 = false;
  forgotPasswordFlag2 = false;
  resetPasswordFlag = false;
  secretQuestion1;
  secretQuestion2;
  secretAnswer1;
  secretAnswer2;
  secretQuestionsInvalidFlag = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _loginservice: LoginService
  ) {}
  loginForm1 = this.fb.group({
    EmployeeID: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*'),
      ],
    ],
    password: ['', [Validators.required]],
  });
  forgotPasswordForm1 = this.fb.group({
    empID: ['', Validators.required],
  });
  forgotEmpForm = this.fb.group({
    emailID: ['', Validators.required],
  });
  secretQuestionsForm = this.fb.group({
    secretA1: ['', Validators.required],
    secretA2: ['', Validators.required],
  });
  resetPasswordForm = this.fb.group(
    {
      nPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}'
          ),
        ],
      ],
      cPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}'
          ),
        ],
      ],
    },
    { validator: passwordValidator }
  );
  ngOnInit(): void {}
  onLogin() {
    //  this.router.navigate(['/login1']);
    console.log('Redirecting');

    let loginaccept = {
      userName: this.loginForm1.get('EmployeeID').value,
      password: this.loginForm1.get('password').value,
    };
    this._loginservice.logsin(loginaccept).subscribe(
      (data) => {
        if (data.authenticated === true) {
          console.log('Logged in successfully');
          //console.log()
          localStorage.setItem('EmployeeID', data.userName);
          console.log(localStorage.getItem(data.userName));
          console.log('Success', data);
        } else {
          this.authenticateMessage = true;
          console.log('check your logged in details clearly', data);
        }
      },
      (error) => console.log('Error', error)
    );
  }

  forgotPassword() {
    this.enableForgotPassword = true;
    console.log(this.enableForgotPassword);
  }

  onForgotPassword() {
    let passwordaccept = {
      employeeId: this.forgotPasswordForm1.get('empID').value,
    };
    console.log('Forgot Password');

    this._loginservice.passwordforgot(passwordaccept).subscribe(
      (data) => {
        console.log('Success', data);
        if (data.secretQn1 === null) {
          this.forgotPasswordFlag1 = true;
        } else {
          this.forgotPasswordFlag2 = true;
          this.secretQuestion1 = data.secretQn1;
          this.secretQuestion2 = data.secretQn2;
          this.secretAnswer1 = data.secretAn1;
          this.secretAnswer2 = data.secretAn2;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  forgotID() {
    this.enableForgotId = true;
    this.enableForgotPassword = false;
    this.forgotPasswordFlag2 = false;
    console.log('Forgot EmployeeID');
  }
  onForgotEMPID() {
    let emailaccept = {
      email: this.forgotEmpForm.get('emailID').value,
    };
    console.log('Forgot employee ID');
    this._loginservice.empidforgot(emailaccept).subscribe(
      (data) => {
        if (data.status === 'NOTFOUND') {
          this.forgotEmployeeIDStatus = true;
          console.log('EmailID not found');
          console.log('Not Found', data);
        } else {
          this.forgotEmployeeIDMessage = data.message;
          this.forgotEmployeeIDFlag = true;
          console.log(data.status, data.message);
          console.log('Success', data);
        }
      },
      (error) => console.log('Error', error)
    );
  }
  onSecretAnswersValidation() {
    if (
      this.secretQuestionsForm.get('secretA1').value === this.secretAnswer1 &&
      this.secretQuestionsForm.get('secretA2').value === this.secretAnswer2
    ) {
      console.log('Given Secret Answers are matchig');
      this.resetPasswordFlag = true;
    } else {
      this.secretQuestionsInvalidFlag = true;
      console.log('No match');
    }
  }
  onResetPasswordValidation() {
    let newPasswordValue = {
      userName: this.forgotPasswordForm1.get('empID').value,
      password: this.resetPasswordForm.get('nPassword').value,

      // confirmPassword:this.resetPasswordForm.get('cPassword').value
    };
    this._loginservice.resetPassword(newPasswordValue).subscribe((data) => {
      console.log('success', data);
    });
  }
}

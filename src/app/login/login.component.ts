import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/sahaya/user/user.service';
import { passwordValidator } from 'src/app/service/validators/resetPasswordValidator';
import { convertCompilerOptionsFromJson } from 'typescript';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  displayLoginForm: boolean = false;
  displaySecretQuestions: boolean = false;
  displayForgotPassword: boolean = false;
  displayForgotEmployeeId: boolean = false;
  displayResetPassword: boolean = false;

  inValidEmpIdErrorMessage: boolean = false;
  authenticateMessage = false;
  forgotEmployeeIDStatus = false;
  forgotEmployeeIDMessage;
  forgotEmployeeIDFlag = false;
  secretQuestion1;
  secretQuestion2;
  secretAnswer1;
  secretAnswer2;
  secretQuestionsInvalidFlag = false;
  resetPasswordSuccessFullFlag=false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _userService: UserService
  ) {}
  loginForm = this.formBuilder.group({
    EmployeeID: [
      '',
      
       [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*'),
      ]
      ,
    ],
    password: ['', [Validators.required]],
  });

  forgotPasswordForm = this.formBuilder.group({
    empID: ['', Validators.required],
  });
  forgotEmpForm = this.formBuilder.group({
    emailID: ['', Validators.required],
  });
  secretQuestionsForm = this.formBuilder.group({
    secretA1: ['', Validators.required],
    secretA2: ['', Validators.required],
  });
  resetPasswordForm = this.formBuilder.group(
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
  ngOnInit(): void {
    this.displayLoginForm = true;
  }

  /**
   * Used to validate user on login form Submission
   */
  loginFormSubmission() {
    let authenticateRequest = {
      userName: this.loginForm.get('EmployeeID').value,
      password: this.loginForm.get('password').value,
    };
    this._userService.authenticateUser(authenticateRequest).subscribe(
      (data) => {
        if (data.authenticated === true) {
          console.log('Logged in successfully');
          //console.log()
          localStorage.setItem('EmployeeID', data.employeeId);
          localStorage.setItem('EmployeeType',data.employeeType);
          localStorage.setItem('eName',data.employeeName);
          console.log('==========',localStorage.getItem("eName"));
          console.log('******************',data.employeeName);
          console.log(localStorage.getItem(data.employeeId));
          console.log('Success', data);
          
          localStorage.setItem('employeeID', data.employeeId);
          localStorage.setItem('employeeType',data.employeeType);
          console.log(localStorage.getItem('employeeID'));
          console.log(localStorage.getItem('employeeType'));
          console.log('Success data values are ', data);
          this.router.navigate(['/dashboard']);
        } else {
          this.authenticateMessage = true;
          console.log('check your logged in details clearly', data);
        }
      },
      (error) => console.log('Error', error)
    );
  }

  /**
   * To display forgot password section and hide other sections
   */
  enableForgotPasswordSection() {
    this.displayForgotPassword = true;
    this.displayLoginForm = false;
    this.displaySecretQuestions = false;
    this.displayForgotEmployeeId = false;
    this.displayResetPassword = false;
  }

  displayLoginSection() {
    this.displayForgotPassword = false;
    this.displayLoginForm = true;
    this.displaySecretQuestions = false;
    this.displayForgotEmployeeId = false;
    this.displayResetPassword = false;
  }

  /**
   * To display forgot employee id section and hide other sections
   */
  enableForgotIdSection() {
    this.displayForgotEmployeeId = true;
    this.displayForgotPassword = false;
    this.displayLoginForm = false;
    this.displaySecretQuestions = false;
    this.displayResetPassword = false;
  }

  /**
   *
   */
  validateEmployeeInvoked() {
    this.inValidEmpIdErrorMessage = false;
    let fetchQuestionsRequest = {
      employeeId: this.forgotPasswordForm.get('empID').value,
    };

    this._userService.fetchQuestions(fetchQuestionsRequest).subscribe(
      (res) => {
        if (res.secretQn1 === null) {
          this.inValidEmpIdErrorMessage = true;
        } else {
          this.displaySecretQuestions = true;
          this.displayForgotPassword = false;
          this.displayLoginForm = false;
          this.displayForgotEmployeeId = false;
          this.displayResetPassword = false;
          this.secretQuestion1 = res.secretQn1;
          this.secretQuestion2 = res.secretQn2;
          this.secretAnswer1 = res.secretAn1;
          this.secretAnswer2 = res.secretAn2;
        }
      },
      (error) => {}
    );
  }

  onForgotEMPID() {
    let fetchEmpIdRequest = {
      email: this.forgotEmpForm.get('emailID').value,
    };
    this._userService.fetchEmpId(fetchEmpIdRequest).subscribe(
      (data) => {
        if (data.status === 'NOTFOUND') {
          this.forgotEmployeeIDStatus = true;
        } else {
          this.forgotEmployeeIDMessage = data.message;
          this.forgotEmployeeIDFlag = true;
        }
      },
      (error) => console.log('Error', error)
    );
  }

  /**
   *
   */
  onSecretAnswersValidation() {
    if (
      this.secretQuestionsForm.get('secretA1').value === this.secretAnswer1 &&
      this.secretQuestionsForm.get('secretA2').value === this.secretAnswer2
    ) {
      this.displayResetPassword = true;
      this.displayForgotPassword = false;
      this.displayLoginForm = false;
      this.displaySecretQuestions = false;
      this.displayForgotEmployeeId = false;
    } else {
      this.secretQuestionsInvalidFlag = true;
    }
  }

  /**
   *
   */
  onResetPasswordValidation() {
    let resetPasswordRequest = {
      employeeId: this.forgotPasswordForm.get('empID').value,
      password: this.resetPasswordForm.get('nPassword').value,
    };
    console.log(this.forgotPasswordForm.get('empID').value, this.resetPasswordForm.get('nPassword').value)
    this._userService.resetPassword(resetPasswordRequest).subscribe(
      data=>{console.log('success',data);
      this.resetPasswordSuccessFullFlag=true;},
      error=>{console.log('error',error)}
    );
  }
}

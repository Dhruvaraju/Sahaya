import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { passwordValidator } from '../password.validator';
import { formSubmitService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 submitted = false;
 alreadyexists = false;
 errors = false;
  lr: any;
  storage :any;
  sub = false;
  
  
  constructor(private fb: FormBuilder,private reg: formSubmitService) { }
  registrationForm = this.fb.group(
    {
      fullname: ['', [Validators.required,Validators.minLength(6)]],
      email: ['', Validators.required],
      employeeType:['',Validators.required],
      phonenumber: ['',[ Validators.required, Validators.maxLength(10),Validators.minLength(10)]],
      question1: ['', Validators.required],
      answer1: ['', Validators.required],
      question2: ['', Validators.required],
      answer2: ['', Validators.required],
      password: ['', [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}')]],
      cpassword: ['', Validators.required],
    },
    {validator: passwordValidator}
  );

 
  
  onsubmit(){
    console.log("hello");
      let formData = {
      name: this.registrationForm.get('fullname').value,
      email: this.registrationForm.get('email').value,
      employeeType: this.registrationForm.get('employeeType').value,
      phoneNumber: this.registrationForm.get('phonenumber').value,
      question1: this.registrationForm.get('question1').value,
      answer1: this.registrationForm.get('answer1').value,
      question2: this.registrationForm.get('question2').value,
      answer2: this.registrationForm.get('answer2').value,
      password: this.registrationForm.get('password').value,
      confirmpassword: this.registrationForm.get('cpassword').value,
     
    };
    
    this.reg.onFormSubmit(formData).subscribe(
      (response) => {
        console.log(response);
        if (response.status === 'ADDED' ) {
          this.storage = response.message;
          this.submitted = true;
          this.sub = true;
        } else if(response.message === 'User already present'){
          this.alreadyexists = true;
        }
      },
      (err) => {
        this.errors = true;
      }
    );
  }
  
ngOnInit(): void{}
  }
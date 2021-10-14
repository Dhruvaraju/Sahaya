import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup,FormControl } from '@angular/forms';
import { passwordValidator } from '../password.validator';
import { UserService } from '../service/sahaya/user/user.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})

export class EmployeeProfileComponent implements OnInit {
  level:number=Number(localStorage.getItem('workPoint'));
  displayChangePassword =false;
  displayGeneral=true;
  SuccessStatement = '';
  FailureStatement = '';

  Apprentice=false;
  Initiated=false;
  Trained=false;
  Able=false;
  Competent=false;
  Adept=false;
  Experienced=false;


  empid: string = localStorage.getItem('EmployeeID');
  // empname: string = localStorage.getItem('name');
  // Contact: string = localStorage.getItem('contactNo');
  emptype = localStorage.getItem('EmployeeType');
  empname = localStorage.getItem('eName');

  constructor(private fb:FormBuilder,private empupdate : UserService) { }
  employeeForm = this.fb.group(
    {
      employeeId:  localStorage.getItem('EmployeeID'),
      name: ['', Validators.required],
     
      contactNo: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      question1: ['', Validators.required],
      answer1: ['', Validators.required],
      question2: ['', Validators.required],
      answer2: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}'),
        ],
      ],
      cpassword: ['', Validators.required],
      // currentpassword: ['', Validators.required],
      // employeeid: ['', Validators.required],
    },
    { validator: passwordValidator }
  );

  
  empDetailUpdate() {
    let formEmployee = {
      employeeId:  localStorage.getItem('EmployeeID'),

      // name:  localStorage.getItem('name'),
      // employeeName:  localStorage.getItem('name'),
      // contactNo:  localStorage.getItem('ContactNo'),
      name: this.employeeForm.get('name').value,
      // email: this.employeeForm.get('email').value,
      contactNo: this.employeeForm.get('contactNo').value,
      secretQn1: this.employeeForm.get('question1').value,
      secretAn1: this.employeeForm.get('answer1').value,
      secretQn2: this.employeeForm.get('question2').value,
      secretAn2: this.employeeForm.get('answer2').value,
      // password: this.employeeForm.get('password').value,
      password: this.employeeForm.get('password').value,
      // currentPassword: this.employeeForm.get('currentPassword').value,
      cpassword: this.employeeForm.get('cpassword').value,
     
    }; 

  
    this.empupdate.empDetailUpdate(formEmployee).subscribe(
      (response) => {
        console.log(response); 
        // if(response.status === 'UPDATED')
        // {
       this.SuccessStatement ='Updated Successfully!!!';
        
      console.log('success');
        // }
        console.log(localStorage.getItem('EmployeeID'));
        
       
        
      },
      (err) => {
        this.FailureStatement =
          'System currently unavailable';
        
        console.log(err);
      }
    );
  }



  ngOnInit() {
    console.log("=%$(++)=",this.emptype);
    console.log("Level is ",this.level);
    console.log(this.Apprentice+"   =======   "+this.Initiated+"     level is "+this.level);
     
switch (Number(true)) {
    case Number(this.level>=0 && this.level<=100):
      this.Apprentice=true;
        
        break;
    case Number(this.level>100 && this.level<=200):
      this.Apprentice=true;
      this.Initiated=true;
        
        break;
    case  Number(this.level>200 && this.level<=300):
      this.Apprentice=true;
      this.Initiated=true;
      this.Trained=true;
        
        break;
    case Number(this.level>300 && this.level<=400):
      this.Apprentice=true;
      this.Initiated=true;
      this.Trained=true;
      this.Able=true;
        
        break;
    case Number(this.level>400 && this.level<=500):
      this.Apprentice=true;
      this.Initiated=true;
      this.Trained=true;
      this.Able=true;
      this.Competent=true;
        
        break;
    case Number(this.level>500 && this.level<=600):
      this.Apprentice=true;
      this.Initiated=true;
      this.Trained=true;
      this.Able=true;
      this.Competent=true;
      this.Adept=true;
        
        break;
    case Number(this.level>600 && this.level<=700):
      this.Apprentice=true;
      this.Initiated=true;
      this.Trained=true;
      this.Able=true;
      this.Competent=true;
      this.Adept=true;
      this.Experienced=true;
        
        break;
      default:
        console.log(Number(this.level>=0 && this.level<=100));
    }
  
   
  }

  invokeChangePassword()
  {
    this.displayChangePassword=true;
this.displayGeneral=false;
  }
  invokeGeneral()
  {
    this.displayGeneral=true;
    this.displayChangePassword=false;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
 
  

}








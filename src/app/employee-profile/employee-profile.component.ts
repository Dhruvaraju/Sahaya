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
  displayChangePassword =false;
  displayGeneral=true;
  SuccessStatement = '';
  FailureStatement = '';
  empid: string = localStorage.getItem('EmployeeID');
  // empname: string = localStorage.getItem('name');
  // Contact: string = localStorage.getItem('contactNo');
  emptype = localStorage.getItem('EmployeeType');
  empname = localStorage.getItem('eName');

  constructor(private fb:FormBuilder,private empupdate : UserService) { }
  employeeForm = this.fb.group(
    {
      
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
      employeeid: ['', Validators.required],
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



  ngOnInit(): void {
    console.log("=%$(++)=",this.emptype);
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








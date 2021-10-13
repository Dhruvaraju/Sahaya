import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../service/sahaya/ticket/ticket.service';
import { UserService } from '../service/sahaya/user/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  EmpID=localStorage.getItem('employeeID');
  constructor( private _ticketService:TicketService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
  }
  feedBackDisplayForm=this.formBuilder.group({
    message:['',[Validators.required]],
    ticketId:['',[Validators.required,Validators.minLength(6),
      Validators.maxLength(6), Validators.pattern('[0-9]*')]]
  })
  submitMessage(message,id){
    let feedback={
      
      ticketId:id,
      message:message
    }
    console.log("Message is "+message+" TicketId is "+id+" feedback "+feedback.message);
    this._ticketService.feedbackFormSubmission(feedback).subscribe(
    (data)=>{data;console.log(data)},
    (error)=>{error;console.log(error)}
    )
  }

}

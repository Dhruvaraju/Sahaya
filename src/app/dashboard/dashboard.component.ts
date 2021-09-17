import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../service/sahaya/ticket/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  

  countOfNewTickets = 0;
  countOfInprogressTickets=0;
  countOfClosedTickets=0;
  countOfPendingTickets=0;
  countOfAssignedTickets=0;
  countOfVerifiedTickets=0;
  public arrayOfNewTickets:any[]=[];
  public arrayOfAssignedTickets:any[]=[];
  public arrayOfInprogressTickets:any[]=[];
  public arrayOfPendingTickets:any[]=[];
  public arrayOfClosedTickets:any[]=[];
  public arrayOfVerifiedTickets:any[]=[];
  traveseFlagOfNewTickets:any;
  failMessageToUpdateDetailsFromNewState=false;
  successMessageToUpdateDetailsFromNewState=false;
  failMessageToUpdateDetailsFromAssignedState=false;
  successMessageToUpdateDetailsFromAssignedState=false;
  failMessageToUpdateDetailsFromInprogressState=false;
  successMessageToUpdateDetailsFromInprogressState=false;
  failMessageToUpdateDetailsFromVerifiedState=false;
  successMessageToUpdateDetailsFromVerifiedState=false;
  failMessageToUpdateDetailsFromPendingState=false;
  successMessageToUpdateDetailsFromPendingState=false;
  statusArrayOfAssignedTickets:any[]=[];
  statusArrayOfInprogressTickets:any[]=[];
  statusArrayOfVerifiedTickets:any[]=[];
  statusArrayOfPendingTickets:any[]=[];
  statusArrayOfClosedTickets:any[]=[];
  showCorrespondingEmployeeWork:any[]=[];
  constructor(
    private _ticketService: TicketService,
    private formBuilder: FormBuilder
  ) {
    
   }

  ngOnInit(
  ): any {
    //console.log("Total tickets");
    this._ticketService.totalTicketsOpened().subscribe(
      (data)=>{console.log("total tickets data ",data);
        console.log(data.length);
      for(let i = 0; i < data.length;i++)
      {
       
        if(data[i].ticketStatus=="NEW")
        {
         this.arrayOfNewTickets[this.countOfNewTickets]=data[i];
          this.countOfNewTickets++;

        }
        else if(data[i].ticketStatus=="IN_PROGRESS"){
          this.arrayOfInprogressTickets[this.countOfInprogressTickets]=data[i];
          if(localStorage.getItem('employeeType')==='ADMIN')
          {
            this.statusArrayOfInprogressTickets[this.countOfInprogressTickets] = true;
          }
          else{
            if(localStorage.getItem('employeeID')==data[i].employeeId)
            {
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId)
              this.statusArrayOfInprogressTickets[this.countOfInprogressTickets] = true;
            }
            else{
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId);
              this.statusArrayOfInprogressTickets[this.countOfInprogressTickets] = false;
            }
          }
          this.countOfInprogressTickets++;
        }
        else if(data[i].ticketStatus==="PENDING")
        {
          this.arrayOfPendingTickets[this.countOfPendingTickets]=data[i];
          if(localStorage.getItem('employeeType')==='ADMIN')
          {
            this.statusArrayOfPendingTickets[this.countOfPendingTickets] = true;
          }
          else{
            if(localStorage.getItem('employeeID')==data[i].employeeId)
            {
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId)
              this.statusArrayOfPendingTickets[this.countOfPendingTickets] = true;
            }
            else{
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId);
              this.statusArrayOfPendingTickets[this.countOfPendingTickets] = false;
            }
          }
          this.countOfPendingTickets++;
        }
        else if(data[i].ticketStatus==="ASSIGNED")
        {
          this.arrayOfAssignedTickets[this.countOfAssignedTickets]=data[i];
          if(localStorage.getItem('employeeType')==='ADMIN')
          {
            this.statusArrayOfAssignedTickets[this.countOfAssignedTickets] = true;
          }
          else{
            if(localStorage.getItem('employeeID')==data[i].employeeId)
            {
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId)
              this.statusArrayOfAssignedTickets[this.countOfAssignedTickets] = true;
            }
            else{
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId);
              this.statusArrayOfAssignedTickets[this.countOfAssignedTickets] = false;
            }
          }
          this.countOfAssignedTickets++;
        }
        else if(data[i].ticketStatus==="VERIFY")
        {
          this.arrayOfVerifiedTickets[this.countOfVerifiedTickets]=data[i];
          if(localStorage.getItem('employeeType')==='ADMIN')
          {
            this.statusArrayOfVerifiedTickets[this.countOfVerifiedTickets] = true;
          }
          else{
            if(localStorage.getItem('employeeID')==data[i].employeeId)
            {
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId)
              this.statusArrayOfVerifiedTickets[this.countOfVerifiedTickets] = true;
            }
            else{
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId);
              this.statusArrayOfVerifiedTickets[this.countOfVerifiedTickets] = false;
            }
          }
          this.countOfVerifiedTickets++;
        }
        else if(data[i].ticketStatus==="CLOSED")
        {
          this.arrayOfClosedTickets[this.countOfClosedTickets]=data[i];
          if(localStorage.getItem('employeeType')==='ADMIN')
          {
            this.statusArrayOfClosedTickets[this.countOfClosedTickets] = true;
          }
          else{
            if(localStorage.getItem('employeeID')==data[i].employeeId)
            {
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId)
              this.statusArrayOfClosedTickets[this.countOfClosedTickets] = true;
            }
            else{
              console.log("Local Storage value ",localStorage.getItem('employeeID'),"data item",data[i].employeeId);
              this.statusArrayOfClosedTickets[this.countOfClosedTickets] = false;
            }
          }
          this.countOfClosedTickets++;
        }
      }
      //console.log("New Tickets "+this.countOfNewTickets)
      //console.log("In Progress "+this.countOfInprogressTickets);
      console.log("Status array of Assigned tickets is ",this.statusArrayOfAssignedTickets);
      console.log("Status array of Inprogress tickets is ",this.statusArrayOfInprogressTickets);
      console.log("Status array of Verified Tickets is ",this.statusArrayOfVerifiedTickets);
      console.log("Status array of Pending Tickets is ",this.statusArrayOfPendingTickets);
      console.log("Status array of closed Tickets is ",this.statusArrayOfClosedTickets);
      for(let i = 0; i < data.length;i++)
      {
        if(localStorage.getItem('employeeID')==data[i].employeeId)
            {
              this.showCorrespondingEmployeeWork[i]=true;
            }
            else{
              this.showCorrespondingEmployeeWork[i]=false;
            }
      }
      console.log("Show Corresponding work detailss "+this.showCorrespondingEmployeeWork);
      },
      (error)=>{console.log(error);}
      
    );
    //console.log("For testing");
    console.log("new tickets data ",this.arrayOfNewTickets);
    console.log("Assigned tickets is",this.arrayOfAssignedTickets);
    console.log("InProgress Tickets is ",this.arrayOfInprogressTickets);
    console.log("Pending Tickets is ",this.arrayOfPendingTickets);
    console.log("Closed Tickets is ",this.arrayOfClosedTickets);
    console.log("Verified Tickets is ",this.arrayOfVerifiedTickets);
   
  }
  /*
  New Tickets Display Form FormBuilder
  */
  newTicketDetailsDisplayForm=this.formBuilder.group({
    
    ticketStatus:['',[Validators.required]],
    ticketSeverity:['',[Validators.required]],
    EmployeeID:['',[
      Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern('[0-9]*'),
    ]],
    EmployeeName: ['', [Validators.required]],
    messageToUser:['',[Validators.required]]
  });
   updateTicketDeatilsFromNewState(ticketIDValue){
  // updateTicketDeatilsFromAssignState(ticketIDValue){

    if( localStorage.getItem('employeeType')=='USER' && this.newTicketDetailsDisplayForm.get('EmployeeID').value!=localStorage.getItem('employeeID')){
        this.failMessageToUpdateDetailsFromNewState=true;
        this.successMessageToUpdateDetailsFromNewState=false;
    }
    else{
      this.successMessageToUpdateDetailsFromNewState=true;
      this.failMessageToUpdateDetailsFromNewState=false;
     console.log("Ticket ID is "+ticketIDValue);
    console.log("Employee ID is "+this.newTicketDetailsDisplayForm.get('EmployeeID').value);
    let newTicketDetails ={
      ticketId:ticketIDValue,
      ticketStatus:this.newTicketDetailsDisplayForm.get('ticketStatus').value,
      severity:this.newTicketDetailsDisplayForm.get('ticketSeverity').value,
      employeeId:this.newTicketDetailsDisplayForm.get('EmployeeID').value,
      employeeName:this.newTicketDetailsDisplayForm.get('EmployeeName').value,
      messageToUser:this.newTicketDetailsDisplayForm.get('messageToUser').value

    }
    console.log(this.newTicketDetailsDisplayForm.get('ticketStatus').value," is the ticket status");

    this._ticketService.ticketStatusUpdatedFromNewState(newTicketDetails).subscribe(
      (data)=>{console.log('Sussecc',data)},
      (error)=>{console.log('error',error)}
    )
    }
  }
  assignedTicketDetailsDisplayForm=this.formBuilder.group(
    {

    }
  )
  updateTicketDetailsFromAssignedState(ticketIDValue,ticketStatus,ticketSeverity,employeeId,employeeName,messageToUser)
  {
    if( localStorage.getItem('employeeType')=='USER' && employeeId!=localStorage.getItem('employeeID')){
      this.failMessageToUpdateDetailsFromAssignedState=true;
      this.successMessageToUpdateDetailsFromAssignedState=false;
  }
  else{
    this.failMessageToUpdateDetailsFromAssignedState=false;
    this.successMessageToUpdateDetailsFromAssignedState=true;
      console.log("values are ticketID is ",ticketIDValue," Ticket Status is ",ticketStatus,"ticket Severity ",ticketSeverity,"empID ",employeeId," employeeName ",employeeName," message to user",messageToUser);
      let assignedTicketDetails={
        ticketId:ticketIDValue,
        ticketStatus:ticketStatus,
        severity:ticketSeverity,
        employeeId:employeeId,
        employeeName:employeeName,
        messageToUser:messageToUser
      }

      this._ticketService.ticketStatusUpdatedFromNewState(assignedTicketDetails).subscribe(
        (data)=>{console.log('Sucess',data)},
        (error)=>{console.log('error',error)}
      )  
    }
  }
  updateTicketDetailsFromInprogressState(ticketIDValue,ticketStatus,ticketSeverity,employeeId,employeeName,messageToUser)
  {
    console.log("Inprogress details values are ticketID is ",ticketIDValue," Ticket Status is ",ticketStatus,"ticket Severity ",ticketSeverity,"empID ",employeeId," employeeName ",employeeName," message to user",messageToUser);
    if( localStorage.getItem('employeeType')=='USER' && employeeId!=localStorage.getItem('employeeID')){
      this.failMessageToUpdateDetailsFromInprogressState=true;
      this.successMessageToUpdateDetailsFromInprogressState=false;
  }
  else{
    this.failMessageToUpdateDetailsFromInprogressState=false;
    this.successMessageToUpdateDetailsFromInprogressState=true;
    let assignedTicketDetails={
      ticketId:ticketIDValue,
      ticketStatus:ticketStatus,
      severity:ticketSeverity,
      employeeId:employeeId,
      employeeName:employeeName,
      messageToUser:messageToUser
    }
    this._ticketService.ticketStatusUpdatedFromInprogressState(assignedTicketDetails).subscribe(
      (data)=>{console.log('Sucess',data)},
      (error)=>{console.log('error',error)}
    )  
  
  }
}
updateTicketDetailsFromVerifiedState(ticketIDValue,ticketStatus,ticketSeverity,employeeId,employeeName,messageToUser)
  {
    console.log("Verified ticket details values are ticketID is ",ticketIDValue," Ticket Status is ",ticketStatus,"ticket Severity ",ticketSeverity,"empID ",employeeId," employeeName ",employeeName," message to user",messageToUser);
    if( localStorage.getItem('employeeType')=='USER' && employeeId!=localStorage.getItem('employeeID')){
      this.failMessageToUpdateDetailsFromVerifiedState=true;
      this.successMessageToUpdateDetailsFromVerifiedState=false;
  }
  else{
    this.failMessageToUpdateDetailsFromVerifiedState=false;
   this.successMessageToUpdateDetailsFromVerifiedState=true;
    let assignedTicketDetails={
      ticketId:ticketIDValue,
      ticketStatus:ticketStatus,
      severity:ticketSeverity,
      employeeId:employeeId,
      employeeName:employeeName,
      messageToUser:messageToUser
    }
    this._ticketService.ticketStatusUpdatedFromVerifiedState(assignedTicketDetails).subscribe(
      (data)=>{console.log('Sucess',data)},
      (error)=>{console.log('error',error)}
    )  
  
  }
}
updateTicketDetailsFromPendingState(ticketIDValue,ticketStatus,ticketSeverity,employeeId,employeeName,messageToUser)
  {
    console.log("Verified ticket details values are ticketID is ",ticketIDValue," Ticket Status is ",ticketStatus,"ticket Severity ",ticketSeverity,"empID ",employeeId," employeeName ",employeeName," message to user",messageToUser);
    if( localStorage.getItem('employeeType')=='USER' && employeeId!=localStorage.getItem('employeeID')){
      this.failMessageToUpdateDetailsFromPendingState=true;
      this.successMessageToUpdateDetailsFromPendingState=false;
  }
  else{
    this.failMessageToUpdateDetailsFromPendingState=false;
   this.successMessageToUpdateDetailsFromPendingState=true;
    let assignedTicketDetails={
      ticketId:ticketIDValue,
      ticketStatus:ticketStatus,
      severity:ticketSeverity,
      employeeId:employeeId,
      employeeName:employeeName,
      messageToUser:messageToUser
    }
    this._ticketService.ticketStatusUpdatedFromVerifiedState(assignedTicketDetails).subscribe(
      (data)=>{console.log('Sucess',data)},
      (error)=>{console.log('error',error)}
    )  
  
  }
}
}

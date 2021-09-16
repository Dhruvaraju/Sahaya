import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../service/sahaya/ticket/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('ticketref',{ static: true }) ticketID: ElementRef
  

  countOfNewTickets = 0;
  countOfInprogressTickets=0;
  countOfResolvedTickets=0;
  countOfPendingTickets=0;
  countOfAssignedTickets=0;
  countOfVerifiedTickets=0;
  public arrayOfNewTickets:any[]=[];
  traveseFlagOfNewTickets:any;
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
          this.countOfInprogressTickets++;
        }
        else if(data[i].ticketStatus==="PENDING")
        {
          this.countOfPendingTickets++;
        }
        else if(data[i].ticketStatus==="ASSIGNED")
        {
          this.countOfAssignedTickets++
        }
        else if(data[i].ticketStatus==="VERIFIED")
        {
          this.countOfVerifiedTickets++;
        }
        else if(data[i].ticketStatus==="RESOLVED")
        {
          this.countOfResolvedTickets++;
        }
      }
      //console.log("New Tickets "+this.countOfNewTickets)
      //console.log("In Progress "+this.countOfInprogressTickets);
      },
      (error)=>{console.log(error);}
      
    );
    //console.log("For testing");
    console.log("new tickets data ",this.arrayOfNewTickets);
  }
  /*
  New Tickets Display Form FormBuilder
  */
  newTicketDetailsDisplayForm=this.formBuilder.group({
    ticketID:[0,[Validators.required]],
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
  updateTicketDeatilsFromAssignState(){
     console.log("Ticket ID is "+this.ticketID.nativeElement.innerHTML);
    console.log("Employee ID is "+this.newTicketDetailsDisplayForm.get('EmployeeID').value);
  }
}

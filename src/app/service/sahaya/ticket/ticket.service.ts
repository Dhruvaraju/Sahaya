import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * To interact with user related services
 */
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  serverUrl = 'https://sahaya-cs.herokuapp.com/api/v1/ticket/';
  constructor(private http: HttpClient) {}
  totalTicketsOpened():Observable<any> {
    return this.http.get<any>(this.serverUrl+'active');
  }
}

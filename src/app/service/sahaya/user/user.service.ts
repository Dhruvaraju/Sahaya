import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * To interact with user related services
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverUrl = ' https://sahaya-cs.herokuapp.com/api/v1/user/';
  constructor(private http: HttpClient) {}

  onFormSubmit(registrationRequest:any):Observable<any>{
    return this.http.post<any>(this.serverUrl+'register',registrationRequest)
}

  authenticateUser(authenticateRequest: any) {
    return this.http.post<any>(
      this.serverUrl + 'authenticate',
      authenticateRequest
    );
  }

  fetchEmpId(fetchEmpIdRequest: any) {
    return this.http.post<any>(this.serverUrl + 'empId', fetchEmpIdRequest);
  }

  fetchQuestions(empInfoReq: any) {
    return this.http.post<any>(this.serverUrl + 'creds', empInfoReq);
  }
  resetPassword(resetPasswordReq: any) {
    return this.http.post<any>(this.serverUrl + 'resetPassword', resetPasswordReq);
  }
 

  empDetailUpdate(formEmployee:any):Observable<any>{
    return this.http.post<any>(this.serverUrl+'updateDetails',formEmployee)

}
  
}

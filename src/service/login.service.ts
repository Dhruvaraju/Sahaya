import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url=' https://sahaya-cs.herokuapp.com/api/v1/user'
  constructor(private _http: HttpClient) { }

  logsin(logdata:any){
   return this._http.post<any>(this._url+'/authenticate',logdata);

  }
  empidforgot(emaildata:any)
  {
    return this._http.post<any>(this._url+'/empId',emaildata);
  }
  passwordforgot(passworddata:any)
  {
    return this._http.post<any>(this._url+'/creds',passworddata);
  }


}

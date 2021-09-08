import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class formSubmitService{
    constructor(private http:HttpClient){}
    url:string='https://sahaya-cs.herokuapp.com/api/v1/user/';
    
    onFormSubmit(formData:any):Observable<any>{
        return this.http.post<any>(this.url+'register',formData)
    }
}
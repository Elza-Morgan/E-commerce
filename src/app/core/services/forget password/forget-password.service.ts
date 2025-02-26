import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../constant/baseURl';
import { Auth } from '../../../shared/interface/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http:HttpClient) { }
   
  verifyEmail(payload:Auth):Observable<any>{
    return this.http.post(`${baseURL.BaseUrl}/api/v1/auth/forgotPasswords`,payload)
  }

  verifyCode(payload:Auth):Observable<any>{
    return this.http.post(`${baseURL.BaseUrl}/api/v1/auth/verifyResetCode`,payload)
  }

  resetPassword(payload:Auth):Observable<any>{
    return this.http.put(`${baseURL.BaseUrl}/api/v1/auth/resetPassword`,payload)
  }








}

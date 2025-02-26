import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from './../../../../../node_modules/jwt-decode/build/cjs/index.d';import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { baseURL } from '../../constant/baseURl';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDataToken:BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);

  constructor(private _http:HttpClient, @Inject(PLATFORM_ID) Id:Object, private router:Router) {

    //& this is used to check if the user is logged in or not 
    //& as you refresh the page it keeps you logged in
    if(isPlatformBrowser(Id)){
        if(localStorage.getItem('userToken') !== null){
            this.HandlingDecodeUserData();
           
        }
    }
   }

  register(formData:Auth):Observable<any>{
    return this._http.post(`${baseURL.BaseUrl}/api/v1/auth/signup`,formData)
  }

  login(formData: Auth): Observable<any> {
    return this._http.post(`${baseURL.BaseUrl}/api/v1/auth/signin`,formData)
  }

  //& Decoding a token using JWT
  HandlingDecodeUserData(){
    const token = localStorage.getItem('userToken')||'';
    const decodedToken = jwtDecode(token);
    // console.log('decodedtoken',decodedToken)
    this.userDataToken.next(decodedToken)

    //& this way is used to make it publicy seen from other components
    //^ this.userDataToken = decodedToken;
  }


  logOut(){
    //& removes the token from localstorage
    localStorage.removeItem('userToken');
    this.userDataToken.next(null);
    
    //& naviagte to login
    this.router.navigate(['/login']);
  }



}

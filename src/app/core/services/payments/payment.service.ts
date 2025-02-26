import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseURL } from '../../constant/baseURl';
import { PayLoad } from '../../../shared/interface/payload';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  token:any

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) Id:object) {
      if(isPlatformBrowser(Id)){
          this.token = localStorage.getItem('userToken');
        }
   }

  CheckOut(cartId:any,payload:PayLoad):Observable<any>{
    return this.http.post(`${baseURL.BaseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
      shippingAddress:payload
    }
  )
  }
}

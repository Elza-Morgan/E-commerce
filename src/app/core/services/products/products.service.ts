import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURl';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private http:HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get(`${baseURL.BaseUrl}/api/v1/products`);
  }


  getSpecificProduct(id:string):Observable<any>{
    return this.http.get(`${baseURL.BaseUrl}/api/v1/products/${id}`)
  }

}

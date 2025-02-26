import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURl';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }



  getAllBrands():Observable<any>{
    return this.http.get(`${baseURL.BaseUrl}/api/v1/brands`);
  }


  getSpecificBrand(brandID:any):Observable<any>{
    return this.http.get(`${baseURL.BaseUrl}/api/v1/brands/${brandID}`)
  }
}

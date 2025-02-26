import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategory():Observable<any>{
   return this.http.get(`${baseURL.BaseUrl}/api/v1/categories`)
  }

  getSpecificCategory(productID:any):Observable<any>{
    return this.http.get(`${baseURL.BaseUrl}/api/v1/categories/${productID}/subcategories`)
  }


}

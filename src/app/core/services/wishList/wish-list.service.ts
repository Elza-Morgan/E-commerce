import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from '../../constant/baseURl';
import { Observable } from 'rxjs';
import { Products } from './../../../shared/interface/products';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishlistItems:Products[]=[]

  constructor(private http:HttpClient) { }

  addToTheWishlist(product:Products):Observable<any>{
    this.wishlistItems.push(product);
    return this.http.post(`${baseURL.BaseUrl}/api/v1/wishlist`,{productId:product._id})
  }

  getTheWishlist():Observable<any>{
    return this.http.get(`${baseURL.BaseUrl}/api/v1/wishlist`)
  }


  removeFromWishList(product:Products):Observable<any>{
    const index = this.wishlistItems.findIndex(item => item._id === product._id);
    if(index != -1){
      this.wishlistItems.splice(index, 1);
    }
    return this.http.delete(`${baseURL.BaseUrl}/api/v1/wishlist/${product._id}`)
  }



  isInWishlist(product:Products):boolean{
    //js method called some() loops over the items and returns true when it finds 
    //most of the lsit is true and fasle otherwise
    return this.wishlistItems.some(item => item._id === product._id)
  }

}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseURL } from '../../constant/baseURl';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  token: any;
  cartNumber: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) Id: object) {
    //used to load up the items automatiically 
    if (isPlatformBrowser(Id)) {
      this.token = localStorage.getItem('userToken');
    }

    this.getProductsToCart().subscribe({
      next: (res) => {
        this.cartNumber.next(res.numOfCartItems);
      },
    });
  }

  addToCart(productId: string): Observable<any> {
    return this.http.post(`${baseURL.BaseUrl}/api/v1/cart`,{productId: productId});
  }

  getProductsToCart(): Observable<any> {
    return this.http.get(`${baseURL.BaseUrl}/api/v1/cart`);
  }

  // headers is needed according to the API doc but because of the interceptor that is created
  // no need to state it because as we send request or recive res it adds the header

  UpdateToCart(productId: string, count: number): Observable<any> {
    return this.http.put(`${baseURL.BaseUrl}/api/v1/cart/${productId}`, {count: count});
  }

  removeSpecificItemFromCart(productId: string): Observable<any> {
    return this.http.delete(`${baseURL.BaseUrl}/api/v1/cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${baseURL.BaseUrl}/api/v1/cart`);
  }
}

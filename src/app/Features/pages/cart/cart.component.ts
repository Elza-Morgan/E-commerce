import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart';
import { Cart } from '../../../shared/interface/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  totalPrice:number=0;
  cartList:Cart[]=[];
  cartId:string='';

  constructor(private _cartService:CartService){}


  getCart(){

    this._cartService.getProductsToCart().subscribe({
      next:(res)=>{
        console.log(res);
      //^ used as rerendering
        this.totalPrice= res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cartId =res.cartId;
        this._cartService.cartNumber.next(res.numOfCartItems)
      }
    })
}

updateCart(productId:string, count:number){
  this._cartService.UpdateToCart(productId,count).subscribe({
    next: (res)=>{
      console.log(productId)
      //^ used as rerendering
      this.totalPrice= res.data.totalCartPrice;
      this.cartList = res.data.products;
    }
  })
}


removeSpecificProduct(productId:string){
  this._cartService.removeSpecificItemFromCart(productId).subscribe({
    next:(res)=>{
      //^ used as rerendering
      this.totalPrice= res.data.totalCartPrice;
      this.cartList = res.data.products;
      
    }
  })
}

clearCart(){
  this._cartService.clearCart().subscribe({
    next:(res)=>{
      this.getCart();
    }
  })
}

ngOnInit(): void {
  this.getCart();
}
}
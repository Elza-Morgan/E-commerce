import { Component, OnInit } from '@angular/core';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { Wishlist } from '../../../shared/interface/wishlist';
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { CartService } from '../../../core/services/cart/cart';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../../../shared/interface/products';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  wishlists:Wishlist[]=[];
  constructor(private _WishlistService:WishListService,private _CartService:CartService,private toaster:ToastrService){}

  ngOnInit(): void {
    this.getWishList()
  }

  getWishList(){
    this._WishlistService.getTheWishlist().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.wishlists=res.data;
      }
    })
  }

  addProductToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        // console.log("added product",res);
        this._CartService.cartNumber.next(res.numOfCartItems)    
        this.toaster.success(res.message,'success',{
          closeButton:true,
          progressBar:true,
          progressAnimation:'increasing',
          timeOut:2000,
          positionClass:'toast-top-left'
        });
      }
    })
  }


  deleteItem(product:Products){
    this._WishlistService.removeFromWishList(product).subscribe({
      next:(res)=>{
        this.getWishList()
      }
    })
  }

}

import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipe/onsale.pipe';
import { FilterPipe } from './../../../shared/pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe,
    OnsalePipe,
    FilterPipe,
    FormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  searchValue: string = '';
  productList: Products[] = [];

  wishlistTokenKey='wishlistToken'

  constructor(
    private _ProductService: ProductsService,
    private _CartService: CartService,
    private toaster: ToastrService,
    private _WishlistService: WishListService,
    @Inject(PLATFORM_ID) id:object
  ){
    const isGettingStoredwishlistTokens = localStorage.getItem('wishlistToken')
    if(isPlatformBrowser(id)){
      //local storage
      if(isGettingStoredwishlistTokens){
          this._WishlistService.wishlistItems = JSON.parse(isGettingStoredwishlistTokens);
      }
    }

  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        // console.log(res.data);
      },
    });
  }

  addProductToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        // console.log("added product",res);
        this._CartService.cartNumber.next(res.numOfCartItems);
        this.toaster.success(res.message, 'success', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 2000,
          positionClass: 'toast-top-left',
        });
      },
    });
  }

  toggleToWishList(product: Products) {
    console.log(product);
    if (this.isInWishList(product)) {
      //& removing from the wishlist
      this._WishlistService.removeFromWishList(product).subscribe({
        next: (res) => {
          localStorage.setItem(this.wishlistTokenKey,JSON.stringify(this._WishlistService.wishlistItems))
          this.toaster.success(res.message, 'success', {
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 2000,
            positionClass: 'toast-top-left',
          });
        },
      });
    } else {
      //& adding to the wishlist
      this._WishlistService.addToTheWishlist(product).subscribe({
        next: (res) => {
          // console.log(res.message)
          console.log("fromwishlist",res)
          // if(product._id === res.)
          localStorage.setItem(this.wishlistTokenKey,JSON.stringify(this._WishlistService.wishlistItems))
          this.toaster.success(res.message, 'success', {
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing',
            timeOut: 2000,
            positionClass: 'toast-top-left',
          });
        },
      });
    }
  }

  isInWishList(product: Products): boolean {
    return this._WishlistService.isInWishlist(product);
  }
}

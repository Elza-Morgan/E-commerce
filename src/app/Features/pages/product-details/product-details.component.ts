import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe,CommonModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  id: any;
  productDetails!:Products;
  productImageList:Products[]=[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductsService,
    private _CartService:CartService,
    private toaster:ToastrService
  ) {
    activatedRoute.params.subscribe((res) => {
      console.log(res['id']);
      this.id = res['id'];
    });
  }


  ngOnInit(): void {
    this.getSpecificProduct();
    
  }

  getSpecificProduct() {
    this.product.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        // console.log(res);
        this.productDetails = res.data;
        this.productImageList=res.data.images;
        console.log(res.data.images);
      },
    });
  }

  addProductToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        console.log("added product",res);
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
}

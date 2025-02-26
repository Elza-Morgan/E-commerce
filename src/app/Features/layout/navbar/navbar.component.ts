import { Component, OnInit,NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  schemas:[NO_ERRORS_SCHEMA]
})
export class NavbarComponent implements OnInit {
  // This is used to make sure which tabs on the navbar appear according to
  // the current route. This is done by checking the route in the navbar.component.html file.
  // and according to the boolean sent from the parent component which is
  //"auth-layout and main-layout" the boolean is sent from there.
  // @Input() showLink:boolean=true;

  isLogin:boolean=false;
  cartNumber!:number;

  constructor(public _auth: AuthService, private _CartService:CartService) {

      this._CartService.cartNumber.subscribe({
        next:(res)=>{
          this.cartNumber=res;
        }
      })
  }

  ngOnInit(): void {
    this._auth?.userDataToken.subscribe({
      next:(res)=>{
        if(res !== null){
          this.isLogin=true;
        }else{
          this.isLogin=false;
        }
      }
    });
  }

}

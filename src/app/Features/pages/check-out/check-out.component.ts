import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/payments/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent {

  cartId:string='';

  constructor(private _PaymentService:PaymentService, private _activatedRoute:ActivatedRoute){
    _activatedRoute.params.subscribe({
      next:(res) => {
        console.log(res['id'])
        this.cartId=res['id'];
      }
    })
  }

  checkOutForm:FormGroup = new FormGroup({
    details:new FormControl(),
    city:new FormControl(),
    phone:new FormControl(),
    })

    submitForm(){
      this._PaymentService.CheckOut(this.cartId,this.checkOutForm.value).subscribe({
        next:(res)=>{
          window.location.href = res.session.url;
        }
      })

    }


  }




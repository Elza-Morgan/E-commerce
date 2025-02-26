import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Brands } from '../../../shared/interface/brands';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brandsList:Brands[]=[];
  isModalOpen: boolean = false;
  selectedBrand: Brands | null = null;


constructor(private _BrandsService:BrandsService){
}


ngOnInit(): void {
  this.getAllBrands();
}

getAllBrands(){
  this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{
      // console.log(res.data);
      this.brandsList=res.data;
    }
  })
}


getSpecificBrand(brandID:any){
  this._BrandsService.getSpecificBrand(brandID).subscribe({
    next:(res)=>{
      console.log('specific brand: ',res.data);
      this.selectedBrand = res.data;
      this.toggleModal();
    }
  })
}

//toggler that turns to true or false
toggleModal() {
  this.isModalOpen = !this.isModalOpen;
}
}
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../shared/interface/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  categoryList:Category[]=[];
  specificCategoryList:Category[]=[];
  selectedCatName:string='';


  constructor(private _CategoryService:CategoryService){}


  ngOnInit(): void {
    this.getAllCategoryies();
    
  }

  getAllCategoryies(){
    this._CategoryService.getAllCategory().subscribe({
      next:(res)=>{
        // console.log('Category',res.data)
        this.categoryList=res.data;
      }
    })
  }

  getSpecificCategory(productID:any, catName:string){
    this._CategoryService.getSpecificCategory(productID).subscribe({
      next:(res)=>{
        console.log('Category sub',res.data)
        this.specificCategoryList=res.data;
      }
    })
    this.selectedCatName=catName
    console.log(catName)

  }

}

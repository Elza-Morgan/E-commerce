import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Features/layout/navbar/navbar.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

import 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'e-commerce';

  // constructor(private router: Router) {
  //   this.router.navigate(['/home']);
  // }

}

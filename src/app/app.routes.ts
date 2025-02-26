import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Features/layout/main-layout/main-layout.component';
// import { LoginComponent } from './Features/auth/login/login.component';
// import { RegisterComponent } from './Features/auth/register/register.component';
// import { HomeComponent } from './Features/pages/home/home.component';
// import { CartComponent } from './Features/pages/cart/cart.component';
// import { CategoriesComponent } from './Features/pages/categories/categories.component';
// import { NotFoundComponent } from './Features/pages/not-found/not-found.component';
// import { ProductDetailsComponent } from './Features/pages/product-details/product-details.component';
// import { ProductsComponent } from './Features/pages/products/products.component';
// import { BrandsComponent } from './Features/pages/brands/brands.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenSkipTestGuard } from './core/guard/checkToken/check-token--skip-test.guard';
import { CheckOutComponent } from './Features/pages/check-out/check-out.component';
// import { RestPasswordComponent } from './Features/auth/rest-password/rest-password.component';

export const routes: Routes = [
  // router outlet is used in app for these children --> auth-layout and main-layout
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[checkTokenSkipTestGuard],
    children: [
      //router outlet is used in AuthLayoutComponent for these children
      // { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'login', loadComponent:()=>import('./Features/auth/login/login.component').then((c)=>c.LoginComponent)},
      
      // { path: 'signup', component: RegisterComponent, title: 'SignUp' },
      { path: 'signup', loadComponent:()=>import('./Features/auth/register/register.component').then((c)=>c.RegisterComponent)},
      
      { path: 'resetPasswords', loadComponent:()=>import('./Features/auth/rest-password/rest-password.component').then((c)=>c.RestPasswordComponent)},
    ],
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      //router outlet is used in Main-LayoutComponent for these children
      { path: ' ', redirectTo: 'home', pathMatch: 'full' },
      // { path: 'home', component: HomeComponent, title: 'Home' },
      
      //^This is lazy loading on standalone
      { path: 'home', loadComponent:()=>import('./Features/pages/home/home.component').then((c)=>c.HomeComponent)},
      // { path: 'productDetails/:id', component: ProductDetailsComponent, title: 'Product Details' },
      { path: 'productDetails/:id', loadComponent:()=>import('./Features/pages/product-details/product-details.component').then((c)=>c.ProductDetailsComponent)},
      // { path: 'cart', component: CartComponent,canActivate:[authGuard], title: 'Cart' },
      { path: 'cart',canActivate:[authGuard], loadComponent:()=>import('./Features/pages/cart/cart.component').then((c)=>c.CartComponent)},
      { path: 'checkout/:id', component:CheckOutComponent,canActivate:[authGuard], title: 'Payment'},
     
      // { path: 'catgories', component: CategoriesComponent, title: 'Category' },
      { path: 'catgories', loadComponent:()=>import('./Features/pages/categories/categories.component').then((c)=>c.CategoriesComponent)},
      
      // { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'brands', loadComponent:()=>import('./Features/pages/brands/brands.component').then((c)=>c.BrandsComponent)},
      
      // { path: 'resetPasswords', component:RestPasswordComponent, title: 'Forget Password' },
      
      // { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'products', loadComponent:()=>import('./Features/pages/products/products.component').then((c)=>c.ProductsComponent)},
    
      { path: 'wishList',canActivate:[authGuard], loadComponent:()=>import('./Features/pages/wish-list/wish-list.component').then((c)=>c.WishListComponent)},

       
    ],
  }, 
];

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Features/layout/main-layout/main-layout.component';
// import { LoginComponent } from './Features/auth/login/login.component';
// import { RegisterComponent } from './Features/auth/register/register.component';
import { HomeComponent } from './Features/pages/home/home.component';
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //& Auth layout (Login, Signup, Reset Password)
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [checkTokenSkipTestGuard],
    children: [
      { path: 'login', loadComponent: () => import('./Features/auth/login/login.component').then(c => c.LoginComponent) },
      { path: 'signup', loadComponent: () => import('./Features/auth/register/register.component').then(c => c.RegisterComponent) },
      { path: 'resetPasswords', loadComponent: () => import('./Features/auth/rest-password/rest-password.component').then(c => c.RestPasswordComponent) },
    ],
  },

  //& Main layout (Home, Products, etc.)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('./Features/pages/home/home.component').then(c => c.HomeComponent)},
      { path: 'productDetails/:id', loadComponent: () => import('./Features/pages/product-details/product-details.component').then(c => c.ProductDetailsComponent) },
      { path: 'cart', canActivate: [authGuard], loadComponent: () => import('./Features/pages/cart/cart.component').then(c => c.CartComponent) },
      { path: 'checkout/:id', component: CheckOutComponent, canActivate: [authGuard], title: 'Payment' },
      { path: 'catgories', loadComponent: () => import('./Features/pages/categories/categories.component').then(c => c.CategoriesComponent) },
      { path: 'brands', loadComponent: () => import('./Features/pages/brands/brands.component').then(c => c.BrandsComponent) },
      { path: 'products', loadComponent: () => import('./Features/pages/products/products.component').then(c => c.ProductsComponent) },
      { path: 'wishList', canActivate: [authGuard], loadComponent: () => import('./Features/pages/wish-list/wish-list.component').then(c => c.WishListComponent) },
    ],
  },

  //reroute to home
  // { path: '**', redirectTo: 'home' }
];



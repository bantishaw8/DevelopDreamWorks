import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutingInterceptior } from './interceptors/routing.interceptor';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [RoutingInterceptior]
  }, {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  }, {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  }, {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule)
  }, {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsPageModule)
  }, {
    path: 'address',
    loadChildren: () => import('./pages/address/address.module').then(m => m.AddressPageModule)
  }, {
    path: 'address-form',
    loadChildren: () => import('./pages/address/address-form/address-form.module').then(m => m.AddressFormPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

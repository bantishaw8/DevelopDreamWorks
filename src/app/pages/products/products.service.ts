import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

export interface Product {
  category: string;
  categoryProductID: string;
  image: string;
  name: string;
  price: number;
  productID: string;
  weight: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  data: Product[] = [
    {
      "category": "CURD",
      "categoryProductID": "CURD000",
      "image": "https://listedproducts.s3.ap-south-1.amazonaws.com/heritageCurd.jpg",
      "name": "Heritage Curd -Total",
      "price": 60,
      "productID": "HERITAGECURDTOTAL000",
      "weight": "450 gm"
      },
      {
        "category": "MILK",
        "categoryProductID": "MILK000",
        "image": "https://listedproducts.s3.ap-south-1.amazonaws.com/heritageCurd.jpg",
        "name": "Milk -Total",
        "price": 120,
        "productID": "MILKTOTAL000",
        "weight": "650 gm"
        }
  ]

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  getProducts(reqData: any): Observable<any> {
    console.log("inside service");
    return this.http
      .post<any>(`${environment.bffUrl}/searchCategoryProducts`, reqData, this.httpOptions)
        .pipe(
          map(products => {
            console.log(products);
            return products;
          })
        );
  }

  getCart(){
    return this.cart;
  }

  getCartItemCount(){
    return this.cartItemCount;
  }

  addProduct(product){
    let added = false;
    for(let p of this.cart) {
      if(p.id === product.id){
        p.amount += 1;
        added = true;
        break;
      }
    }
    if(!added){
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }


}

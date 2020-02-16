import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsService } from './products.service'
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  cart = [];
  products: Observable<any>;
  cartItemCount: BehaviorSubject<number>;
  selectedProd: any;
  failureMessage: string = "";
  cartValue: any;
  productImage: string;
  productsCopy: any;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;
  alertCtrl: any;
  data: any;
  constructor(private productService: ProductsService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special)
      }
    })
    let searchFilter = {
      searchItem: this.data.productName,
      productHeadImage: this.data.productHeadImage
    }
    this.productService.getProducts(searchFilter).subscribe(result => {
      if (result.response === "success") {
        this.products = result.message;
        this.productImage = result.productHeadImage
        this.productsCopy = this.products
        this.failureMessage = null;
      } else {
        this.productImage = searchFilter.productHeadImage
        this.failureMessage = result.message;
      }
    })

    this.cart = this.productService.getCart();
    this.cartItemCount = this.productService.getCartItemCount();
    this.cartValue = 0;
  }

  decreaseCartItem(product) {
    this.productService.decreaseProduct(product);
    this.cartValue = this.cartValue - 1;
  }

  increaseCartItem(product) {
    this.productService.addProduct(product);
    this.cartValue = this.cartValue + 1;
  }

  removeCartItem(product) {
    this.productService.removeProduct(product);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

  getItems(findItem) {
    let find = findItem.target.value;
    if (find && find.trim() !== '') {
      this.products = this.productsCopy;
      this.products = this.productService.filterItems(this.products, find);
    } else {
      this.products = this.productsCopy;
    }
  }
}

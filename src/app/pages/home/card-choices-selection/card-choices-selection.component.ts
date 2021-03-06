import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardChoiceSelectionModel } from 'src/app/models/card-choice-selection.model';

@Component({
  selector: 'app-card-choices-selection',
  templateUrl: './card-choices-selection.component.html',
  styleUrls: ['./card-choices-selection.component.scss'],
})
export class CardChoicesSelectionComponent implements OnInit {
  firstRow = [];
  secondRow = [];
  @Input() public ChoiceData: CardChoiceSelectionModel;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  getProducts(productCategory) {
    const productData = {
      category: productCategory.category,
      productID: productCategory.productID,
      productName: productCategory.productName,
      productHeadImage: productCategory.ImageUrl
    }
    this.router.navigate(['/products'], {
      queryParams: {
        special: JSON.stringify(productData)
      }
    })
  }

}

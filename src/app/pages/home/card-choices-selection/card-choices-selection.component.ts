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

  getProducts() {
    this.router.navigate(['/products'], {
      queryParams : { searchItem: this.ChoiceData.productName },
    });
  }

}

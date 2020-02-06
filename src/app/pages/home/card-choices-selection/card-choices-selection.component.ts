import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-choices-selection',
  templateUrl: './card-choices-selection.component.html',
  styleUrls: ['./card-choices-selection.component.scss'],
})
export class CardChoicesSelectionComponent implements OnInit {
  firstRow = [];
  secondRow = [];
  @Input() public ChoiceData;
  constructor() { }

  ngOnInit() {
  };

}

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
    this.firstRow.push(this.ChoiceData[0]);
    this.firstRow.push(this.ChoiceData[1]);
    this.secondRow.push(this.ChoiceData[2]);
    this.secondRow.push(this.ChoiceData[3]);
    this.secondRow.push(this.ChoiceData[4]);

    this.firstRow[0].size = 4;
    this.firstRow[0].width  = '80px';
    this.firstRow[0].left = '-10px';
    this.firstRow[1].size = 8;
    this.firstRow[1].width  = '170px';

    this.firstRow.map(item => {
      item.height = '140px';
    });

    this.secondRow.map(item => {
      item.size = 4;
      item.height = '90px';
      item.width = '80px';
      item.top =  '-22px';
    });
  };

}

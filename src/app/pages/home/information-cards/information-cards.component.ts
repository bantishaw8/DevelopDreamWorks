import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-information-cards',
  templateUrl: './information-cards.component.html',
  styleUrls: ['./information-cards.component.scss'],
})
export class InformationCardsComponent implements OnInit {
  @Input() public InformationData;
  constructor() { }

  ngOnInit() {
  }

}

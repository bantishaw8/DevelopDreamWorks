import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-information-cards',
  templateUrl: './information-cards.component.html',
  styleUrls: ['./information-cards.component.scss'],
})
export class InformationCardsComponent implements OnInit {
  displayList = [];
  @Input() public InformationData;
  constructor() { }

  ngOnInit() {
    this.displayList = [
      {
        image : "https://omgcitydiscount.com/blog-img/food-discount-deals-subscription-our-history-who-we-are-15325971308210.jpeg",
        id : 3
      },{
        image :  "https://omgcitydiscount.com/blog-img/food-discount-deals-subscription-our-history-who-we-are-15325971308210.jpeg",
        id : 2
      },{
        image :  "https://i.pinimg.com/736x/86/1c/61/861c61a80c0f0be60cb889df3ea1d235.jpg",
        id : 3
      }
    ]
    console.log("childInformationData",this.InformationData)
  }

}

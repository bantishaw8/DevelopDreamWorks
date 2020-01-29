import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-choices-selection',
  templateUrl: './card-choices-selection.component.html',
  styleUrls: ['./card-choices-selection.component.scss'],
})
export class CardChoicesSelectionComponent implements OnInit {
  displayList = [];
  constructor() { }

  ngOnInit() {
    this.displayList = [
      {
        image : "https://thepromox.com/wp-content/uploads/2018/04/faasos-50-off-coupon.png",
        size : 4,
        height: '140px',
        width: '80px',
        left: '-10px'
      },{
        image :  "https://i.pinimg.com/736x/86/1c/61/861c61a80c0f0be60cb889df3ea1d235.jpg",
        size : 8,
        height: '140px',
        width: '170px'
      },{
        image :  "https://i.pinimg.com/736x/86/1c/61/861c61a80c0f0be60cb889df3ea1d235.jpg",
        size : 4,
        height: '90px',
        width: '80px',
        top: '-22px'
      },{
        image :  "https://i.pinimg.com/736x/86/1c/61/861c61a80c0f0be60cb889df3ea1d235.jpg",
        size : 4,
        height: '90px',
        width: '80px',
        top: '-22px'
      },{
        image :  "https://i.pinimg.com/736x/86/1c/61/861c61a80c0f0be60cb889df3ea1d235.jpg",
        size : 4,
        height: '90px',
        width: '80px',
        top: '-22px'
      }
    ]
  }

}

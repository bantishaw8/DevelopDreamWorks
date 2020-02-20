import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { HomeServiceService } from './home-service.service';
import { ModalController } from '@ionic/angular';
import { LocationModalComponent } from '../home/location-modal/location-modal.component';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private user: User;
  public firstCard = [];
  public secondCard = [];
  public locationModal = false;
  public generatedAddress: string;
  
  public currentModal = null;
  constructor(private authService: AuthServiceService,
    private homeService: HomeServiceService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.homeService.getLandingPage().subscribe(results => {
      results.message.forEach(element => {
        if (element.category === "FIRSTCARD") {
          this.firstCard.push(element)
        } else if (element.category === "SECONDCARD") {
          this.secondCard.push(element)
        }
      });
    })
  }

  logout() {
    this.authService.logout();
  }

  async openLocation() {
      const modal = await this.modalController.create({
        component: LocationModalComponent
      });
      
      await modal.present();
      this.currentModal = modal;

      modal.onDidDismiss()
      .then((data) => {
        const user = data['data']; // Here's your selected user!
        this.generatedAddress = user.results[0].formatted_address
    });
  }

}

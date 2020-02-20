import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HomeServiceService } from '../home-service.service';


@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit {
  public placeholderValue ="Search for area or landmark"
  constructor(public modalController: ModalController,
    private geolocation: Geolocation,
    private homeService: HomeServiceService,
    private loadingController: LoadingController) { }

  ngOnInit() {}

  getLocation() {
    this.presentLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      let positionObject = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }
      this.homeService.getGoogleMapAdress(positionObject).subscribe(response => {
        this.loadingController.dismiss();
        this.modalController.dismiss(response);
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Getting your current location',
      spinner: 'crescent',
      cssClass: 'custom-class'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

}

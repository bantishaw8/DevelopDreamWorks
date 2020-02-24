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
  public placeholderValue = "Search for area or landmark";
  public searchString: string;
  public displayAddress = [];
  public loadingAddress = false;
  public address: string;
  constructor(public modalController: ModalController,
    private geolocation: Geolocation,
    private homeService: HomeServiceService,
    private loadingController: LoadingController) { }

  ngOnInit() { }

  getLocation() {
    this.presentLoading();
    this.geolocation.getCurrentPosition().then((resp) => {
      let positionObject = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }
      this.homeService.getGoogleMapAdress(positionObject).subscribe(response => {
        this.loadingController.dismiss();
        this.selectAddress(response.results[0].formatted_address)
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

  getAddress(location) {
    if (location.length > 2) {
      this.displayAddress = [];
      this.loadingAddress = true;
      this.homeService.getGoogleAPILocation(location).subscribe(result => {
        if (result.response === 'success') {
          this.displayAddress = result.message;
          this.loadingAddress = false;
        }
      })
    } else {
      this.displayAddress = [];
      this.loadingAddress = false;
    }
  }

  selectAddress(address) {
    const getLocalStorage = JSON.parse(localStorage.getItem("currentUser")),
      googleAddress = {
        address: {
          selectedAddress: address
        },
        phoneNumber: getLocalStorage.message
      };
    this.displayAddress = [];
    this.loadingAddress = true;
    this.homeService.saveGoogleAddress(googleAddress).subscribe(result => {
      const sendDataToHomePage = {
        results: [
          {
            formatted_address: result.message.selectedAddress
          }
        ]
      }
      this.loadingAddress = false;
      this.modalController.dismiss(sendDataToHomePage)
    })
  }
}

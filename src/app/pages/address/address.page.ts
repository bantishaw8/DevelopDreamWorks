import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from './address.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  loadingSpinner = false;
  currentLocation: any;
  defaultAddress: any;
  label: string;
  constructor(public formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private addressService: AddressService,
    public alertController: AlertController) {

  }

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.currentLocation = JSON.parse(params.special)
      }
    })
  }

  async deleteAddress(addressDetails) {
    const userStoredDetails = JSON.parse(localStorage.getItem('currentUser'))
    const sendAddress = {
      address: addressDetails,
      phone: userStoredDetails.message
    }
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete the address ?',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel Delete Address');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.loadingSpinner = true;
            this.addressService.deleteAddress(sendAddress)
              .subscribe(result => {
                this.loadingSpinner = false;
                this.currentLocation = result.message
              })
          }
        }
      ]
    });
    await alert.present();
  }
}

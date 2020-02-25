import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressService } from './address.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  addressForm: any;
  currentLocation: any;
  submitAttempt: Boolean = false;
  defaultAddress: any;
  label:string;
  constructor(public formBuilder: FormBuilder,
    private userAddress: AddressService,
    private commonService: CommonService) {
    
  }

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();
    console.log(this.currentLocation)
    this.defaultAddress = this.currentLocation.address.selectedAddress
    this.addressForm = this.formBuilder.group({
      name: [''],
      flat: [''],
      street: [''],
      locality: [this.defaultAddress]
    });
  }

  save() {
    this.submitAttempt = true;
    this.addressForm.value.label = this.label;
    const address = {
      address : this.addressForm.value,
      phone: this.currentLocation.mobile
    }
    this.userAddress.addAddress(address).subscribe(result => {
      console.log(result);
    });
  }

  segmentChanged(ev: any) {
    this.label = ev.detail.value;
  }
}

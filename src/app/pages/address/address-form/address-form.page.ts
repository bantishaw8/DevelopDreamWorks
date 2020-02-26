import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddressService } from '../address.service';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.page.html',
  styleUrls: ['./address-form.page.scss'],
})
export class AddressFormPage implements OnInit {

  addressForm: any;
  addAddress: boolean = false;
  currentLocation: any;
  submitAttempt: Boolean = false;
  defaultAddress: any;
  label:string;

  constructor(public formBuilder: FormBuilder,
    private userAddress: AddressService,
    private commonService: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();
    console.log(this.currentLocation);
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
      this.router.navigate(['/address']);
      console.log(result);
    });
  }

  segmentChanged(ev: any) {
    this.label = ev.detail.value;
  }

}

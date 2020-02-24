import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressService } from './address.service';
import { Address } from 'cluster';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  addressForm: any;
  address: Address;
  currentLocation: string;
  submitAttempt: Boolean = false;
  constructor(public formBuilder: FormBuilder, private userAddress: AddressService, private commonService: CommonService) {
    this.addressForm = formBuilder.group({
      name: [''],
      flat: [''],
      street: [''],
      locality: ['']
  });
   }

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();
    console.log(this.currentLocation);
    //this.userAddress.getAddresses('userId').subscribe(result => {
     // this.address = result;
   // });
  }

  save() {
    this.submitAttempt = true;
    console.log(this.addressForm)
    // this.userAddress.addAddress(this.addressForm.values).subscribe(result => {
    //   console.log(result);
    // });
}



}

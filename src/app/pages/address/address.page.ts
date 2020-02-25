import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  currentLocation: any;
  defaultAddress: any;
  label:string;
  constructor(public formBuilder: FormBuilder,
    private commonService: CommonService) {
    
  }

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();
    console.log(this.currentLocation);
    this.defaultAddress = this.currentLocation.address.selectedAddress
  }
}

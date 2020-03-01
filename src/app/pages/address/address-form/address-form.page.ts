import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AddressService } from "../address.service";
import { CommonService } from "src/app/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-address-form",
  templateUrl: "./address-form.page.html",
  styleUrls: ["./address-form.page.scss"]
})
export class AddressFormPage implements OnInit {
  addressForm: any;
  addAddress: boolean = false;
  currentLocation: any;
  submitAttempt: Boolean = false;
  defaultAddress: any;
  label: string;
  loadingSpinner = false;
  constructor(
    public formBuilder: FormBuilder,
    private userAddress: AddressService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();

    if (this.currentLocation && this.currentLocation.address) {
      this.defaultAddress = this.currentLocation.address.selectedAddress;
    } else {
      this.defaultAddress = "";
    }
    this.addressForm = this.formBuilder.group({
      name: [""],
      flat: [""],
      street: [""],
      locality: [this.defaultAddress]
    });
  }

  save() {
    const userStoredDetails = JSON.parse(localStorage.getItem("currentUser"));
    this.submitAttempt = true;
    this.addressForm.value.label = this.label;
    const address = {
      address: this.addressForm.value,
      phone: userStoredDetails.message
    };
    this.loadingSpinner = true;
    this.userAddress.addAddress(address).subscribe(result => {
      this.loadingSpinner = false;
      this.router.navigate(["/address"], {
        queryParams: {
          special: JSON.stringify(result.message)
        }
      });
    });
  }

  segmentChanged(ev: any) {
    this.label = ev.detail.value;
  }
}

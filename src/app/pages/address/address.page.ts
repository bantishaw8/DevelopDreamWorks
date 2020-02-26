import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  currentLocation: any;
  defaultAddress: any;
  label: string;
  constructor(public formBuilder: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.currentLocation = this.commonService.getUserLocation();
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.currentLocation = JSON.parse(params.special)
      }
    })
  }
}

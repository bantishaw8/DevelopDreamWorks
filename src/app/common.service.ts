import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userLocation: any;
  constructor() { }

  setUserLocation(loc) {
    this.userLocation = loc;
  }

  getUserLocation(){
    return this.userLocation;
  }

}

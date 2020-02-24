import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userLocation: string;
  constructor() { }

  setUserLocation(loc) {
    this.userLocation = loc;
  }

  getUserLocation(){
    return this.userLocation;
  }

}

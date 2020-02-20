import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { HomeServiceService } from './home-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private user: User;
  public firstCard = [];
  public secondCard = [];

  constructor(private authService: AuthServiceService,
    private homeService: HomeServiceService,
    private geolocation: Geolocation) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.homeService.getLandingPage().subscribe(results => {
      results.message.forEach(element => {
        if (element.category === "FIRSTCARD") {
          this.firstCard.push(element)
        } else if (element.category === "SECONDCARD") {
          this.secondCard.push(element)
        }
      });
    })
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    this.geolocation.getCurrentPosition(options).then((resp) => {
      console.log("res ; ", resp)
      let positionObject = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      }
      this.homeService.getGoogleMapAdress(positionObject).subscribe(response => {
        console.log(response)
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  logout() {
    this.authService.logout();
  }
}

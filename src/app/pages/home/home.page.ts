import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthServiceService } from '../../services/auth-service.service';
import { HomeServiceService } from './home-service.service';

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
    private homeService: HomeServiceService) { }

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

  }

  logout() {
    this.authService.logout();
  }
}

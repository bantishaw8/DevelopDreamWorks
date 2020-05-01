import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { AuthServiceService } from "../../services/auth-service.service";
import { HomeServiceService } from "./home-service.service";
import { ModalController } from "@ionic/angular";
import { LocationModalComponent } from "../home/location-modal/location-modal.component";
import { map, catchError, mergeMap } from "rxjs/operators";
import { of, forkJoin } from "rxjs";
import { CommonService } from "src/app/common.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  private user: User;
  public firstCard = [];
  public secondCard = [];
  public locationModal = false;
  public generatedAddress: string;
  public userDetails: any;
  public currentModal = null;
  constructor(
    private authService: AuthServiceService,
    private homeService: HomeServiceService,
    public modalController: ModalController,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.loadData();
  }

  public loadData() {
    this.landingPageDetails()
      .pipe(mergeMap(() => forkJoin(this.userProfile())))
      .subscribe(() => {
        console.log("All API Calls Finished Loading");
      });
  }

  /**
   * Get Landing Page Details
   */
  public landingPageDetails() {
    return this.homeService.getLandingPage().pipe(
      map(results => {
        results.message.forEach(element => {
          if (element.category === "FIRSTCARD") {
            this.firstCard.push(element);
          } else if (element.category === "SECONDCARD") {
            this.secondCard.push(element);
          }
        });
      }),
      catchError(err => {
        console.error(err);
        return of({});
      })
    );
  }

  /**
   * Get User Profile Details based on his Phone Number
   */
  public userProfile() {
    const userStoredDetails = JSON.parse(localStorage.getItem("currentUser"));
    const user = {
      phone: userStoredDetails.message
    };
    return this.homeService.getUserProfileDetails(user).pipe(
      map(result => {
        if (result.response === "success") {
          this.userDetails = result.message;
          this.commonService.setUserLocation(this.userDetails);
          if (this.userDetails.address) {
            this.generatedAddress = this.userDetails.address.selectedAddress;
          }
        }
      }),
      catchError(err => {
        console.error(err);
        return of({});
      })
    );
  }

  /**
   * Logout User
   */
  logout() {
    this.authService.logout();
    this.commonService.userLocation = "";
  }

  /**
   * Opens up the modal Page when clicked on location button
   */
  async openLocation() {
    const modal = await this.modalController.create({
      component: LocationModalComponent
    });

    await modal.present();
    this.currentModal = modal;

    modal.onDidDismiss().then(data => {
      const user = data["data"]; // Here's your selected user!
      this.generatedAddress = user.results[0].formatted_address;
      if (this.userDetails.address) {
        this.userDetails.address.selectedAddress = this.generatedAddress;
        this.commonService.setUserLocation(this.userDetails);
      } else {
        this.userDetails.address = {};
        this.userDetails.address.selectedAddress = this.generatedAddress;
        this.commonService.setUserLocation(this.userDetails);
      }
    });
  }
}

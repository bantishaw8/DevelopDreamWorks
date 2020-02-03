import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../../services/auth-service.service';
import { first } from 'rxjs/operators';
import { stat } from 'fs';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  submitted = false;
  authForm: FormGroup;
  returnUrl: string;
  loading = false;
  isLogin = true;
  MobileNumber = "Mobile Number"
  refferalCodeInfo = "I have a referral code"
  authheaderTitle = "Login"
  information: string = "Login using OTP";

  /**
   * For Checking Refferal in Sign Up Page
   */
  enableReferralCode = false;
  checkedRefferal = false;
  showReferral = false;
  switchButton = "Sign Up";

  /**
   * Preparing Register Object
   */
  registerForm =  {
    phone: [
      null,
      [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
    ],
    referralCode:[
      null,
      []
    ]
  };

  /**
   * Preparing Login Object
   */
  loginForm = {
    phone: [
      null,
      [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
    ]
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private alertController: AlertController
  ) {
    this.router.navigate(["/"]);
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group(
      this.loginForm,
      {}
    );

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit(value: any): void {
    console.log("value : ",value)
    this.submitted = true;
    // Stop if the form validation has failed
    if (this.authForm.invalid) {
      return;
    }

    if (this.isLogin){
      // this.loading = true;
      // this.authService
      //   .login(this.frm.email.value, this.frm.password.value)
      //   .pipe(first())
      //   .subscribe(
      //     data => {
      //       this.loading = false;
      //       this.router.navigate([this.returnUrl]);
      //     },
      //     error => {
      //       this.presentAlert(error.error.message);
      //       this.loading = false;
      //     }
      //   );
      this.loading = false;
      this.router.navigate([this.returnUrl]);
    } else {
      this.loading = true;
      this.authService
        .register(value).subscribe(
          data => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.presentAlert(error.error.message);
            this.loading = false;
          }
        )
    }
  }

  onReset() {
    this.submitted = false;
    this.authForm.reset();
  }

  onSwitchAuthMode() {
    
    this.isLogin = !this.isLogin;
    if(this.isLogin){
      this.information = "Login using OTP";
      this.authheaderTitle = "Login";
      this.showReferral = false;
      this.switchButton = "Sign Up";
      this.authForm = this.formBuilder.group(
        this.loginForm,
        {}
      );
    } else {
      this.authheaderTitle = "Sign Up";
      this.information = "Help us to serve you better !";
      this.showReferral = true;
      this.switchButton = "Login";
      this.authForm = this.formBuilder.group(
        this.registerForm,
        {}
      );
    }

  }

  enableCheckedReference(status) {
    console.log("statys : ",status)
    if(status) {
      this.enableReferralCode = false;
      this.checkedRefferal = false;
    } else {
      this.enableReferralCode = true;
      this.checkedRefferal= true;
    }
    
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "",
      message: msg,
      buttons: ["OK"]
    });

    await alert.present();
  }

  get frm() { return this.authForm.controls; }    
}

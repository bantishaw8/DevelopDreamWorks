import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../../services/auth-service.service';
import { first } from 'rxjs/operators';

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
      {
        email: [
          "dreamWorks@gmail.com",
          [Validators.required, Validators.email]
        ],
        password: ["password", [Validators.required, Validators.minLength(6)]]
      },
      {}
    );

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit(value: any): void {
    this.submitted = true;

    // Stop if the form validation has failed
    if (this.authForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.frm.email.value, this.frm.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.presentAlert(error.error.message);
          this.loading = false;
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.authForm.reset();
  }

  onRegister(){
    // codeing inprogress ..
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

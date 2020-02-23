import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuConfig } from './models/menuConfig';
import { Menu } from './models/menu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  options: MenuConfig = { multi: false };
  menus: Menu[] = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      active: false,
    }, {
      title: 'My Account',
      url: '/home',
      icon: 'person',
      active: false,
      submenu: [
        {
          title: 'My Address',
          url: '',
          icon: 'information-circle',
        },
        {
          title: 'My Orders',
          url: '',
          icon: 'information-circle',
        },
        {
          title: 'My Cart',
          url: '',
          icon: 'information-circle',
        },
        {
          title: 'Wallet',
          url: '',
          icon: 'information-circle',
        }
      ]
    },
    {
      title: 'Customer Support',
      url: '/list',
      icon: 'information-circle',
      active: false
    }, {
      title: 'Rate Us',
      url: '/list',
      icon: 'star',
      active: false
    }, {
      title: 'Share',
      url: '/list',
      icon: 'share-social',
      active: false
    }, {
      title: 'About Us',
      url: '/list',
      icon: 'aperture',
      active: false
    }, {
      title: 'Logout',
      url: '/list',
      icon: 'power',
      active: false
    }, {
      title: 'About This Release',
      icon: 'settings',
      url: '/home',
      active: false
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

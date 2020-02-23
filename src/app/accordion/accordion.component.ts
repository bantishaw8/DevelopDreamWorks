import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../models/menu';
import { MenuConfig } from '../models/menuConfig';
// import { Config, Menu } from './types';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  @Input() options;
  @Input() menus: Menu[];
  config: MenuConfig;

  constructor() { }

  ngOnInit() {
    this.config = this.mergeConfig(this.options);
  }

  mergeConfig(options: MenuConfig) {
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return { ...config, ...options };
  }

  toggle(index: number) {
    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }
    this.menus[index].active = !this.menus[index].active;
  }

}

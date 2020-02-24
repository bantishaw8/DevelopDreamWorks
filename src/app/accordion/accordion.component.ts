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
  
  @Input() menus: Menu[];

  constructor() { }

  ngOnInit() { }

}

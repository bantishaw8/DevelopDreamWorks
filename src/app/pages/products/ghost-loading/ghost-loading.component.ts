import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ghost-loading',
  templateUrl: './ghost-loading.component.html',
  styleUrls: ['./ghost-loading.component.scss'],
})
export class GhostLoadingComponent implements OnInit {
  @Input() public ghosts;
  constructor() { }

  ngOnInit() {}

}

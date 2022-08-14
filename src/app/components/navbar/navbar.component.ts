import { Component, HostListener, OnInit } from '@angular/core';
import {
  faCircleInfo,
  faBookOpenReader,
  faBars
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'comp-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor() {}

  currentWindowWidth: number = 0;
  faBookOpenReader = faBookOpenReader;
  faCircleInfo = faCircleInfo;
  faBars = faBars;
  isMenu: boolean = false;

  ngOnInit() {
    this.currentWindowWidth = window.innerWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  onMenu(value: boolean) {
    this.isMenu = !this.isMenu;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  constructor(private router: Router, private menu: MenuController) {
    this.menu.enable(false, 'custom-menu');
  }

  ngOnInit() {}

  login() {
    this.router.navigateByUrl('dashboard');
  }
}

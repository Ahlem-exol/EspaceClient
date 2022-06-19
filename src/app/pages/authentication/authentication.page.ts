import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController
  
    ) {
    this.menu.enable(false, 'custom-menu');
  }
  isLoading = false;

  ngOnInit() {}

  login(form: NgForm) {
    console.log('we are in the ts auth page ');
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).subscribe(
      (result) => {
        console.log(result);
        this.isLoading = !this.isLoading;
      },
      (error) => {
        console.log(error.error.message);
        this.isLoading = !this.isLoading;
      }
    );
    form.reset();
  }
}

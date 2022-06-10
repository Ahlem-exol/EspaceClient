import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  date = new Date();
  nameUser: any;
  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;

    console.log(
      'we are in the header components  :  ',
      this.authService.getAuthData()
    );
  }

  addUser(form: NgForm) {
    if (!form.valid) {
      return;
    }

    console.log('i m in ts', this.date.toLocaleString());
    const nom = form.value.nom;
    const prenom = form.value.prenom;
    const fonction = form.value.fonction;
    const adress = form.value.adress;
    const telephone = form.value.telephone;
    const email = form.value.email;
    const dateInscreption = this.date;
    this.authService
      .createUser(
        nom,
        prenom,
        fonction,
        dateInscreption,
        adress,
        telephone,
        email
      )
      .subscribe(
        (result) => {
          form.reset();
        },
        (error) => {}
      );
  }
}
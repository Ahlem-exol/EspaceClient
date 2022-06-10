import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  date = new Date();
  nameUser: any;
  id: number;
  sub: Subscription;
  loadedUsers: User[];
  tablestyle = 'bootstrap';

  constructor(
    public modalController: ModalController,
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private UserService: UsersService
  ) {
    this.menu.enable(true, 'custom-menu');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;
    this.id = parseInt(this.authService.getAuthData().id);
    this.sub = this.UserService.getUsers().subscribe((usersdata) => {
      console.log(usersdata.users);
      this.loadedUsers = usersdata.users;
    });
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

  deleteUser(idUser: number) {
    this.UserService.DeleteUser(idUser).subscribe((res) => {
      this.router.navigate(['/user']);
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  date = new Date();
  nameUser: any;
  idSession: number;
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

  async _openModal() {
    const modal = await this.modalController.create({
      component: AddUserComponent,
    });
    return await modal.present();
  }

  async _openModalUpdate(user: User) {
    const modal = await this.modalController.create({
      component: UpdateUserComponent,
      componentProps: { user },
    });
    return await modal.present();
  }

  async _openModalDelete(user: User) {
    console.log(user.id);
    const modal = await this.modalController.create({
      component: DeleteUserComponent,
      componentProps: { user },
    });
    return await modal.present();
  }

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;
    this.idSession = parseInt(this.authService.getAuthData().id);
    this.sub = this.UserService.getUsers().subscribe((usersdata) => {
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
}
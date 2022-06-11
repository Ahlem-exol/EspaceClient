import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  date = new Date();
  constructor(
    private modelControl: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  _dismiss() {
    this.modelControl.dismiss();
  }
  addContact(form: NgForm) {
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

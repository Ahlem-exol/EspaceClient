import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactService } from 'src/app/services/contact/contact.service';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  date = new Date();
  sub: Subscription;
  loadedSociete: Societe[];
  constructor(
    private modelControl: ModalController,
    private authService: AuthService,
    private ContactService: ContactService,
    private SocieteService: SocieteService
  ) {}

  ngOnInit() {
    this.sub = this.SocieteService.getSocietes().subscribe((societesData) => {
      this.loadedSociete = societesData.societes;
    });
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  addContact(form: NgForm) {
    console.log('in the ts', form.value);
    if (!form.valid) {
      return;
    }

    const nom = form.value.nom;
    const prenom = form.value.prenom;
    const fonction = form.value.fonction;
    const adress = form.value.adress;
    const telephone = form.value.telephone;
    const email = form.value.email;
    const dateInscreption = this.date;
    const idSociete = form.value.societe;

    this.ContactService.createContact(
      nom,
      prenom,
      fonction,
      dateInscreption,
      adress,
      telephone,
      email,
      idSociete
    ).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

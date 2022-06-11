import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.scss'],
})
export class AddSocieteComponent implements OnInit {
  date: Date;
  constructor(
    private modelControl: ModalController,
    private SocieteService: SocieteService
  ) {}

  ngOnInit() {}

  _dismiss() {
    this.modelControl.dismiss();
  }
  addSociete(form: NgForm) {
    if (!form.valid) {
      return;
    }

    console.log('i m in ts', this.date.toLocaleString());
    const raison_social = form.value.raison_social;
    const adresse = form.value.adresse;
    const mail = form.value.mail;
    const telephone = form.value.telephone;
    const description = form.value.description;
    const fixe = form.value.fixe;

    this.SocieteService.createSociete(
      raison_social,
      adresse,
      mail,
      telephone,
      description,
      fixe
    ).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

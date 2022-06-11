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


    const raisonSocial = form.value.raisonSocial;
    const adresse = form.value.adresse;
    const mail = form.value.mail;
    const telephone = form.value.telephone;
    const description = form.value.description;
    const fixe = form.value.fixe;

    this.SocieteService.createSociete(
      raisonSocial,
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

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SocieteService } from 'src/app/services/societe/societe.service';
@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss'],
})
export class AddProjetComponent implements OnInit {
  date = new Date();
  sub: Subscription;
  loadedSociete: Societe[];
  constructor(
    private modelControl: ModalController,
    private authService: AuthService,
    private ProjetService: ProjetService,
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
  addProjet(form: NgForm) {
    console.log('in the ts', form.value);
    if (!form.valid) {
      return;
    }

    const titre = form.value.titre;
    const duree = form.value.duree;
    const description = form.value.description;
    const localisation = form.value.localisation;
    const dateDemarage = form.value.dateDemarage;
    const dateFin = form.value.dateFin;
    const idSociete = form.value.societe;

    this.ProjetService.createProjet(
      titre,
      duree,
      description,
      localisation,
      dateDemarage,
      dateFin,
      idSociete
    ).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

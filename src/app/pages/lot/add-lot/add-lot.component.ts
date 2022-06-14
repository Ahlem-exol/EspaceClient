import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LotService } from 'src/app/services/lot/lot.service';
import { ProjetService } from 'src/app/services/projet/projet.service';

@Component({
  selector: 'app-add-lot',
  templateUrl: './add-lot.component.html',
  styleUrls: ['./add-lot.component.scss'],
})
export class AddLotComponent implements OnInit {
  date = new Date();
  sub: Subscription;
  loadedProjet: Projet[];
  constructor(
    private modelControl: ModalController,
    private authService: AuthService,
    private LotService: LotService,
    private ProjetService: ProjetService
  ) {}

  ngOnInit() {
    this.sub = this.ProjetService.getProjets().subscribe((projetsData) => {
      this.loadedProjet = projetsData.projets;
    });
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  createLot(form: NgForm) {
    console.log('in the ts', form.value);
    if (!form.valid) {
      return;
    }

    const titre = form.value.titre;
    const duree = form.value.duree;
    const description = form.value.description;
    const dateFinLot = form.value.dateFinLot;
    const prj_id = form.value.projet;

    this.LotService.createLot(
      titre,
      duree,
      description,
      dateFinLot,
      prj_id
    ).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

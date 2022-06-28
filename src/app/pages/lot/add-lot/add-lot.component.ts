import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LotService } from 'src/app/services/lot/lot.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format, parseISO } from 'date-fns';

declare interface type {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-add-lot',
  templateUrl: './add-lot.component.html',
  styleUrls: ['./add-lot.component.scss'],
})
export class AddLotComponent implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;

  dateValue: any;
  dateValue2 = '';
  date = new Date();

  sub: Subscription;
  loadedProjet: Projet[];
  AfficheDateFin = 0;
  DateDebut: Date;
  dureeCalculer = 0;

  listEtat: type[] = [
    { title: 'Fin', icon: 'ni-tv-2 text-primary' },
    { title: 'En attente', icon: 'ni-tv-2 text-primary' },
    { title: 'En cours', icon: 'ni-tv-2 text-primary' },
  ];

  constructor(
    private modelControl: ModalController,
    private authService: AuthService,
    private LotService: LotService,
    private ProjetService: ProjetService
  ) {}

  confirm() {
    this.datetime.confirm(true);
  }
  reset() {
    this.datetime.reset();
  }
  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

  ngOnInit() {
    this.sub = this.ProjetService.getProjets().subscribe((projetsData) => {
      this.loadedProjet = projetsData.projets;
    });
    // this.datedebut = this.navParams.get('datedebut');
    // console.log('From the construction', this.datedebut);
  }

  chnageDateDebut() {}

  calculeDuree($event) {
    console.log('date debut ', this.DateDebut);
    console.log(event);
    // this.datedebut = this.navParams.get('datedebut');
    // console.log('From the construction', this.datedebut);
  }
  _dismiss() {
    this.modelControl.dismiss();
  }
  createLot(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const titre = form.value.titre;
    const duree = form.value.duree;
    const description = form.value.description;
    const dateFinLot = form.value.dateFinLot;
    const datedebut = form.value.datedebut;
    const etat = form.value.etat;
    const prj_id = form.value.projet;

    this.LotService.createLot(
      titre,
      duree,
      description,
      dateFinLot,
      datedebut,
      etat,
      prj_id
    ).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

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
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;

  dateValue: any;
  dateValue2: any;
  date = new Date();
  dateDebut: any;
  datefin: any;
  sub: Subscription;
  loadedProjet: Projet[];
  AfficheDateFin = 0;
  DateDebut: Date;
  todayNumber: number;
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
  formatDate1(value: string) {
    this.dateValue = format(parseISO(value), 'yyyy-MM-dd');
    console.log(this.dateValue);
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  formatDate2(value: string) {
    this.dateValue2 = format(parseISO(value), 'yyyy-MM-dd');
    console.log(this.dateValue2);
    //calculer la  duree is the date de fin -date de debut
    this.todayNumber = this.dateValue2;
    console.log('let convertet to string', this.todayNumber);
    this.todayNumber = this.dateValue2;
    return format(parseISO(value), 'yyyy-MM-dd');
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
    const montentLot = form.value.montentLot;
    const dateFinLot = this.dateValue2;
    const datedebut = this.dateValue;
    const etat = form.value.etat;
    const prj_id = form.value.projet;

    this.LotService.createLot(
      titre,
      duree,
      description,
      montentLot,
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

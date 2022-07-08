import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';
import { Lot } from 'src/app/models/lot.model';

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
  loadedLots: Lot[];

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
    private ArticleService: ArticleService
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
    this.sub = this.LotService.getLots().subscribe((LotsData) => {
      this.loadedLots = LotsData.lots;
    });
    // this.datedebut = this.navParams.get('datedebut');
    // console.log('From the construction', this.datedebut);
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  createArticle(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log('the data send to the service ', form.value);
    const designation = form.value.designation;
    const unite = form.value.unite;
    const quantite = form.value.quantite;
    const prixUnitaire = form.value.prixUnitaire;
    const dateFin = this.dateValue2;
    const datedebut = this.dateValue;
    const lot_id = form.value.lot;

    this.ArticleService.createArticle(
      designation,
      unite,
      quantite,
      prixUnitaire,
      dateFin,

      datedebut,
      lot_id
    ).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

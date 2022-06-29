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
import { Lot } from 'src/app/models/lot.model';
declare interface type {
  title: string;
  icon: string;
}

@Component({
  selector: 'app-stat-lot',
  templateUrl: './stat-lot.component.html',
  styleUrls: ['./stat-lot.component.scss'],
})
export class StatLotComponent implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @Input() lot: Lot;
  dateValue: any;

  constructor(
    private modelControl: ModalController,
    private LotService: LotService
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

  ngOnInit() {
    // this.datedebut = this.navParams.get('datedebut');
    // console.log('From the construction', this.datedebut);
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  UpdateEtatLot(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const percentage = form.value.percentage;
    const dateUpdate = this.dateValue;
    const lot_id = this.lot.id;

    this.LotService.updateLotStat(percentage, dateUpdate, lot_id).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

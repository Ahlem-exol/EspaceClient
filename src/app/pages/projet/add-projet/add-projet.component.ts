import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
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
  @ViewChild(IonDatetime) datetime: IonDatetime;

  dateDebut: any;
  dateFin: any;

  date = new Date();
  sub: Subscription;
  loadedSociete: Societe[];
  constructor(
    private modelControl: ModalController,
    private authService: AuthService,
    private ProjetService: ProjetService,
    private SocieteService: SocieteService
  ) {}

  confirm() {
    this.datetime.confirm(true);
  }
  reset() {
    this.datetime.reset();
  }
  formatDate1(value: string) {
    this.dateDebut = format(parseISO(value), 'yyyy-MM-dd');
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  formatDate2(value: string) {
    this.dateFin = format(parseISO(value), 'yyyy-MM-dd');

    return format(parseISO(value), 'yyyy-MM-dd');
  }

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
    const dateDemarage = this.dateDebut;
    const dateFin = this.dateFin;
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
      (res) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

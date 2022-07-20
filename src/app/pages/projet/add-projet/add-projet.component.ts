import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControlName, NgForm } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Subscription } from 'rxjs';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SocieteService } from 'src/app/services/societe/societe.service';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss'],
})
export class AddProjetComponent implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  AddProjet: FormGroup;
  dateDebut: any;
  dateFin: any;
  titre: string;
  description: string;
  localisation: string;
  duree: number;
  societe: string;
  date = new Date();
  sub: Subscription;
  loadedSociete: Societe[];
  validation_messages = {
    titre: [
      { type: 'required', message: 'Le titre is required.' },
      {
        type: 'minlength',
        message: 'Titre must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Titre cannot be more than 255 characters long.',
      },
    ],
    req: [{ type: 'required', message: 'this champs is required.' }],
  };
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

    var one_day = 1000 * 60 * 60 * 24;
    var DateDebut = new Date(this.dateDebut);
    var DateFin = new Date(this.dateFin);

    // Convert both dates to milliseconds
    var date1_ms = DateDebut.getTime();
    var date2_ms = DateFin.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    this.duree = Math.round(difference_ms / one_day);
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.sub = this.SocieteService.getSocietes().subscribe((societesData) => {
      this.loadedSociete = societesData.societes;
    });

    this.AddProjet = new FormGroup({
      //i put all the input and there form validateur
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(800),
      ]),
      localisation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(800),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      societe: new FormControl('', [Validators.required]),
      dateFin: new FormControl('', [Validators.required]),
      dateDebut: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
    });
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  addProjet() {
    console.log('in the ts', this.titre);
    const titre = this.titre;
    const duree = this.duree + ' Days';
    const description = this.description;
    const localisation = this.localisation;
    const dateDemarage = this.dateDebut;
    const dateFin = this.dateFin;
    const idSociete = this.societe;

    console.log(
      titre,
      duree,
      description,
      localisation,
      dateDemarage,
      dateFin,
      idSociete
    );
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
        this.ngOnInit();
      },
      (error) => {}
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { Societe } from 'src/app/models/societe.model';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.scss'],
})
export class UpdateProjetComponent implements OnInit {
  @Input() projet: Projet;
  toast: any;
  sub: Subscription;
  loadedSociete: Societe[];
  constructor(
    private modelControl: ModalController,
    private SocieteService: SocieteService,
    private toastController: ToastController,
    private ContactService: ProjetService
  ) {}

  ngOnInit() {
    this.sub = this.SocieteService.getSocietes().subscribe((societesData) => {
      this.loadedSociete = societesData.societes;
    });
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  async toastUpdate() {
    this.toast = await this.toastController.create({
      message: 'the client update !!! ',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  updateProjet() {
    this.ContactService.updateProjet(this.projet).subscribe((res) => {
      this.toastUpdate();
      this.modelControl.dismiss();
    });
  }
}

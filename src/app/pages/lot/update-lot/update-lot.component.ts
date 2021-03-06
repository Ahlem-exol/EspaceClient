import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot.model';
import { Projet } from 'src/app/models/projet.model';
import { LotService } from 'src/app/services/lot/lot.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
declare interface type {
  title: string;
  icon: string;
}
@Component({
  selector: 'app-update-lot',
  templateUrl: './update-lot.component.html',
  styleUrls: ['./update-lot.component.scss'],
})
export class UpdateLotComponent implements OnInit {
  @Input() lot: Lot;
  toast: any;
  sub: Subscription;
  loadedProjet: Projet[];
  listEtat: type[] = [
    { title: 'Fin', icon: 'ni-tv-2 text-primary' },
    { title: 'En attente ', icon: 'ni-tv-2 text-primary' },
    { title: 'En cours', icon: 'ni-tv-2 text-primary' },
  ];

  constructor(
    private modelControl: ModalController,
    private ProjetService: ProjetService,
    private toastController: ToastController,
    private LotService: LotService
  ) {}

  ngOnInit() {
    this.sub = this.ProjetService.getProjets().subscribe((projestsData) => {
      this.loadedProjet = projestsData.projets;
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

  updatLot() {
    console.log(this.lot);
    this.LotService.updateLot(this.lot).subscribe((res) => {
      this.toastUpdate();
      this.modelControl.dismiss();
    });
  }
}

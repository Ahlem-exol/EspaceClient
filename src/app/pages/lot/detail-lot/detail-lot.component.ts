import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot.model';
import { Projet } from 'src/app/models/projet.model';
import { StatLot } from 'src/app/models/statLot.model';
import { LotService } from 'src/app/services/lot/lot.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
@Component({
  selector: 'app-detail-lot',
  templateUrl: './detail-lot.component.html',
  styleUrls: ['./detail-lot.component.scss'],
})
export class DetailLotComponent implements OnInit {
  @Input() lot: Lot;
  sub: Subscription;
  loadedStat: StatLot[];
  constructor(
    private modelControl: ModalController,
    private toastController: ToastController,
    private LotService: LotService
  ) {}

  ngOnInit() {
    this.sub = this.LotService.getLotStaTs(this.lot.id).subscribe(
      (Lotsdata) => {
        this.loadedStat = Lotsdata.lotstats;
        console.log(this.loadedStat);
      }
    );
  }
}

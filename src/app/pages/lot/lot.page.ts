import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Lot } from 'src/app/models/lot.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LotService } from 'src/app/services/lot/lot.service';
import { AddLotComponent } from './add-lot/add-lot.component';
import { DeleteLotComponent } from './delete-lot/delete-lot.component';
import { UpdateLotComponent } from './update-lot/update-lot.component';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.page.html',
  styleUrls: ['./lot.page.scss'],
})
export class LotPage implements OnInit {
  date = new Date();
  nameUser: any;
  idSession: number;
  sub: Subscription;
  loadedLot: Lot[];
  tablestyle = 'bootstrap'; // dark
  projet: number;
  constructor(
    public modalController: ModalController,
    private router: Router,
    private menu: MenuController,
    private LotService: LotService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  async _openModal() {
    const modal = await this.modalController.create({
      component: AddLotComponent,
    });
    return await modal.present();
  }

  async _openModalUpdate(lot: Lot) {
    const modal = await this.modalController.create({
      component: UpdateLotComponent,
      componentProps: { lot },
    });
    return await modal.present();
  }

  async _openModalDelete(lot: Lot) {
    console.log(this.authService.getAuthData());
    console.log(lot.id);
    const modal = await this.modalController.create({
      component: DeleteLotComponent,
      componentProps: { lot },
    });
    return await modal.present();
  }

  async _detaille(lot: Lot) {
    const lotId = lot.id;
    console.log('we are in the lot sanding stata to ', lotId);
    this.router.navigate(['/article', lotId]);
  }

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;
    console.log(this.authService.getAuthData());
    this.idSession = parseInt(this.authService.getAuthData().id);
    this.projet = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.sub = this.LotService.getLots(this.projet).subscribe((Lotsdata) => {
      this.loadedLot = Lotsdata.lots;
      console.log(this.loadedLot);
    });
  }
}

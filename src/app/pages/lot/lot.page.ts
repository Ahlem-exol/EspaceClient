import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    public modalController: ModalController,
    private router: Router,
    private menu: MenuController,
    private LotService: LotService,
    private authService: AuthService
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

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;
    console.log(this.authService.getAuthData());
    this.idSession = parseInt(this.authService.getAuthData().id);
    this.sub = this.LotService.getLots().subscribe((Lotsdata) => {
      this.loadedLot = Lotsdata.lots;
      console.log(this.loadedLot);
    });
  }

  // addUser(form: NgForm) {
  //   if (!form.valid) {
  //     return;
  //   }

  //   console.log('i m in ts', this.date.toLocaleString());
  //   const nom = form.value.nom;
  //   const prenom = form.value.prenom;
  //   const fonction = form.value.fonction;
  //   const adress = form.value.adress;
  //   const telephone = form.value.telephone;
  //   const email = form.value.email;
  //   const dateInscreption = this.date;
  //   this.authService
  //     .createUser(
  //       nom,
  //       prenom,
  //       fonction,
  //       dateInscreption,
  //       adress,
  //       telephone,
  //       email
  //     )
  //     .subscribe(
  //       (result) => {
  //         form.reset();
  //       },
  //       (error) => {}
  //     );
  // }
}
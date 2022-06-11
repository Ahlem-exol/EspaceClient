import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SocieteService } from 'src/app/services/societe/societe.service';
import { AddSocieteComponent } from './add-societe/add-societe.component';
import { DeleteSocieteComponent } from './delete-societe/delete-societe.component';
import { UpdateSocieteComponent } from './update-societe/update-societe.component';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.page.html',
  styleUrls: ['./societe.page.scss'],
})
export class SocietePage implements OnInit {
  date = new Date();
  nameUser: any;
  idSession: number;
  sub: Subscription;
  loadedSocites: Societe[];
  tablestyle = 'bootstrap'; // dark

  constructor(
    public modalController: ModalController,
    private router: Router,
    private menu: MenuController,
    private SocieteService: SocieteService,
    private authService: AuthService
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  async _openModal() {
    const modal = await this.modalController.create({
      component: AddSocieteComponent,
    });
    return await modal.present();
  }

  async _openModalUpdate(societe: Societe) {
    const modal = await this.modalController.create({
      component: UpdateSocieteComponent,
      componentProps: { societe },
    });
    return await modal.present();
  }

  async _openModalDelete(societe: Societe) {
    console.log(this.authService.getAuthData());
    console.log(societe.id);
    const modal = await this.modalController.create({
      component: DeleteSocieteComponent,
      componentProps: { societe },
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
    this.sub = this.SocieteService.getSocietes().subscribe((societesdata) => {
      this.loadedSocites = societesdata.societes;
      console.log(this.loadedSocites);
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

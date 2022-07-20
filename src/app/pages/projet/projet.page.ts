import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Projet } from 'src/app/models/projet.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
import { AddProjetComponent } from './add-projet/add-projet.component';
import { DeleteProjetComponent } from './delete-projet/delete-projet.component';
import { UpdateProjetComponent } from './update-projet/update-projet.component';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.page.html',
  styleUrls: ['./projet.page.scss'],
})
export class ProjetPage implements OnInit {
  date = new Date();
  nameUser: any;
  idSession: number;
  sub: Subscription;
  loadedProjet: Projet[];
  tablestyle = 'bootstrap'; // dark

  constructor(
    public modalController: ModalController,
    private router: Router,
    private menu: MenuController,
    private ProjetService: ProjetService,
    private authService: AuthService
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  async _openModal() {
    const modal = await this.modalController.create({
      component: AddProjetComponent,
    });
    return await modal.present();
  }

  async _openModalUpdate(projet: Projet) {
    const modal = await this.modalController.create({
      component: UpdateProjetComponent,
      componentProps: { projet },
    });
    return await modal.present();
  }

  async _openModalDelete(projet: Projet) {
    console.log(this.authService.getAuthData());
    console.log(projet.id);
    const modal = await this.modalController.create({
      component: DeleteProjetComponent,
      componentProps: { projet },
    });
    return await modal.present();
  }

  _openDetaille(projet: Projet) {
    const ProjetId = projet.id;
    console.log('we are in the lot sanding stata to ', ProjetId);
    this.router.navigate(['/lot', ProjetId]);
  }

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;
    console.log(this.authService.getAuthData());
    this.idSession = parseInt(this.authService.getAuthData().id);
    this.sub = this.ProjetService.getProjets().subscribe((Projetsdata) => {
      this.loadedProjet = Projetsdata.projets;
      console.log(this.loadedProjet);
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

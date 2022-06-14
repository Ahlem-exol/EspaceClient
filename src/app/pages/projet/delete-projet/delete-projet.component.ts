import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Projet } from 'src/app/models/projet.model';
import { ProjetService } from 'src/app/services/projet/projet.service';

@Component({
  selector: 'app-delete-projet',
  templateUrl: './delete-projet.component.html',
  styleUrls: ['./delete-projet.component.scss'],
})
export class DeleteProjetComponent implements OnInit {
  @Input() projet: Projet;
  toast: any;

  constructor(
    private modelControl: ModalController,
    private toastController: ToastController,
    private ProjetService: ProjetService
  ) {}

  ngOnInit() {}

  _dismiss() {
    this.modelControl.dismiss();
  }

  async toastDelete() {
    this.toast = await this.toastController.create({
      message: 'the Projet deleted',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  deletProjet() {
    console.log('the contact ', this.projet);
    this.ProjetService.DeleteProjet(this.projet.id).subscribe((res) => {
      this.toastDelete();
      this.modelControl.dismiss();
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Societe } from 'src/app/models/societe.model';
import { SocieteService } from 'src/app/services/societe/societe.service';
@Component({
  selector: 'app-delete-societe',
  templateUrl: './delete-societe.component.html',
  styleUrls: ['./delete-societe.component.scss'],
})
export class DeleteSocieteComponent implements OnInit {
  @Input() societe: Societe;
  toast: any;

  constructor(
    private modelControl: ModalController,
    private toastController: ToastController,
    private SocieteService: SocieteService
  ) {}

  ngOnInit() {}

  _dismiss() {
    this.modelControl.dismiss();
  }

  async toastDelete() {
    this.toast = await this.toastController.create({
      message: 'the societe deleted',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  deleteSociete() {
    console.log(this.societe);
    this.SocieteService.DeleteSociete(this.societe.id).subscribe((res) => {
      this.toastDelete();
      this.modelControl.dismiss();
    });
  }
}

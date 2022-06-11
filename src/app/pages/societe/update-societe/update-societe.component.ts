import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Societe } from 'src/app/models/societe.model';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-update-societe',
  templateUrl: './update-societe.component.html',
  styleUrls: ['./update-societe.component.scss'],
})
export class UpdateSocieteComponent implements OnInit {
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
  async toastUpdate() {
    this.toast = await this.toastController.create({
      message: 'the societ update !!! ',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  updateUser() {
    this.SocieteService.updateSociete(this.societe).subscribe((res) => {
      this.toastUpdate();
      this.modelControl.dismiss();
    });
  }
}

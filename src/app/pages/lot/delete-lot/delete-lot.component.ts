import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Lot } from 'src/app/models/lot.model';
import { LotService } from 'src/app/services/lot/lot.service';

@Component({
  selector: 'app-delete-lot',
  templateUrl: './delete-lot.component.html',
  styleUrls: ['./delete-lot.component.scss'],
})
export class DeleteLotComponent implements OnInit {
  @Input() lot: Lot;
  toast: any;

  constructor(
    private modelControl: ModalController,
    private toastController: ToastController,
    private LotService: LotService
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

  deletLot() {
    console.log('the contact ', this.lot);
    this.LotService.DeleteLot(this.lot.id).subscribe((res) => {
      this.toastDelete();
      this.modelControl.dismiss();
    });
  }
}

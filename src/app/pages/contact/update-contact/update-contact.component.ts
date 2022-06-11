import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Societe } from 'src/app/models/societe.model';
import { ContactService } from 'src/app/services/contact/contact.service';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss'],
})
export class UpdateContactComponent implements OnInit {
  @Input() contact: Contact;
  toast: any;
  sub: Subscription;
  loadedSociete: Societe[];
  constructor(
    private modelControl: ModalController,
    private SocieteService: SocieteService,
    private toastController: ToastController,
    private ContactService: ContactService
  ) {}

  ngOnInit() {
    this.sub = this.SocieteService.getSocietes().subscribe((societesData) => {
      this.loadedSociete = societesData.societes;
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

  updatecontact() {
    this.ContactService.updateContact(this.contact).subscribe((res) => {
      this.toastUpdate();
      this.modelControl.dismiss();
    });
  }
}

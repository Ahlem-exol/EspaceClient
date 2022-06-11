import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.scss'],
})
export class DeleteContactComponent implements OnInit {
  @Input() contact: Contact;
  toast: any;

  constructor(
    private modelControl: ModalController,
    private toastController: ToastController,
    private ContactService: ContactService
  ) {}

  ngOnInit() {}

  _dismiss() {
    this.modelControl.dismiss();
  }

  async toastDelete() {
    this.toast = await this.toastController.create({
      message: 'the Client deleted',
      duration: 2000,
      animated: false,
      position: 'top',
      color: 'secondary',
    });
    this.toast.present();
  }

  deletClient() {
    console.log('the contact ', this.contact);
    this.ContactService.DeleteContact(this.contact.id).subscribe((res) => {
      this.toastDelete();
      this.modelControl.dismiss();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Societe } from 'src/app/models/societe.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactService } from 'src/app/services/contact/contact.service';
import { AddContactComponent } from './add-contact/add-contact.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  date = new Date();
  nameUser: any;
  idSession: number;
  sub: Subscription;
  loadedContacts: Contact[];

  tablestyle = 'bootstrap';

  constructor(
    public modalController: ModalController,
    private router: Router,
    private authService: AuthService,
    private menu: MenuController,
    private ContactService: ContactService
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  async _openModal() {
    const modal = await this.modalController.create({
      component: AddContactComponent,
    });
    return await modal.present();
  }

  async _openModalUpdate(contact: Contact) {
    const modal = await this.modalController.create({
      component: UpdateContactComponent,
      componentProps: { contact },
    });
    return await modal.present();
  }

  async _openModalDelete(contact: Contact) {
    const modal = await this.modalController.create({
      component: DeleteContactComponent,
      componentProps: { contact },
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
    this.sub = this.ContactService.getContactS().subscribe((contactsData) => {
      this.loadedContacts = contactsData.contacts;
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
const BACKEND_URL = 'http://localhost:3000/api/contact';
interface addData {
  nom: string;
  prenom: string;
  fonction: string;
  dateInscreption: Date;
  adress: string;
  telephone: string;
  email: string;
  idSociete: number;
}
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  createContact(
    nom: string,
    prenom: string,
    fonction: string,
    dateInscreption: Date,
    adress: string,
    telephone: string,
    email: string,
    idSociete: number
  ) {
    const ContData: addData = {
      nom: nom,
      prenom: prenom,
      fonction: fonction,
      dateInscreption: dateInscreption,
      adress: adress,
      telephone: telephone,
      email: email,
      idSociete: idSociete,
    };

    console.log(ContData);
    return this.http.post<{ message: string }>(`${BACKEND_URL}/`, ContData);
  }

  getContactS() {
    return this.http.get<{ message: string; contacts: Contact[] }>(
      `${BACKEND_URL}/`
    );
  }

  updateContact(updateContact: Contact) {
    console.log(updateContact.societe);
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + updateContact.id,
      updateContact
    );
  }
  DeleteContact(idContact: number) {
    console.log('id user ', idContact);

    return this.http.put<{ message: string }>(
      BACKEND_URL + '/desactiver/' + idContact,
      null
    );
  }
}

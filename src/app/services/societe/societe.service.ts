import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Societe } from 'src/app/models/societe.model';
const BACKEND_URL = 'http://localhost:3000/api/societe';
interface addData {
  raisonSocial: string;
  adresse: string;
  mail: string;
  telephone: string;
  description: string;
  fixe: string;
}
@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  constructor(private http: HttpClient) {}

  createSociete(
    raisonSocial: string,
    adresse: string,
    mail: string,
    telephone: string,
    description: string,
    fixe: string
  ) {
    const authData: addData = {
      raisonSocial: raisonSocial,
      adresse: adresse,
      mail: mail,
      telephone: telephone,
      description: description,
      fixe: fixe,
    };

    return this.http.post<{ message: string }>(`${BACKEND_URL}/`, authData);
  }

  getSocietes() {
    console.log('get societe');
    return this.http.get<{ message: string; societes: Societe[] }>(
      `${BACKEND_URL}/`
    );
  }

  updateSociete(updateSociete: Societe) {
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + updateSociete.id,
      updateSociete
    );
  }
  DeleteSociete(idClient: number) {
    console.log('id user ', idClient);

    return this.http.put<{ message: string }>(
      BACKEND_URL + '/desactiver/' + idClient,
      null
    );
  }
}

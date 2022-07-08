import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from 'src/app/models/projet.model';

const BACKEND_URL = 'http://localhost:3000/api/projet';
interface addData {
  titre: string;
  duree: string;
  description: string;
  localisation: string;
  dateDemarage: Date;
  dateFin: Date;
  societe_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjetService {
  constructor(private http: HttpClient) {}

  createProjet(
    titre: string,
    duree: string,
    description: string,
    localisation: string,
    dateDemarage: Date,
    dateFin: Date,
    societe_id: string
  ) {
    const ProjData: addData = {
      titre: titre,
      duree: duree,
      description: description,
      localisation: localisation,
      dateDemarage: dateDemarage,
      dateFin: dateFin,
      societe_id: societe_id,
    };

    return this.http.post<{ message: string }>(`${BACKEND_URL}/`, ProjData);
  }

  getProjets() {
    return this.http.get<{ message: string; projets: Projet[] }>(
      `${BACKEND_URL}/`
    );
  }

  getProjet(id: number) {
    return this.http.get<{ message: string; projet: Projet }>(
      `${BACKEND_URL}/` + id
    );
  }

  updateProjet(updateProjet: Projet) {
    console.log(updateProjet.societe);
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + updateProjet.id,
      updateProjet
    );
  }
  DeleteProjet(idProjet: number) {
    console.log('id user ', idProjet);

    return this.http.put<{ message: string }>(
      BACKEND_URL + '/desactiver/' + idProjet,
      null
    );
  }
}

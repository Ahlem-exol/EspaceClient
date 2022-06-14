import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lot } from 'src/app/models/lot.model';

const BACKEND_URL = 'http://localhost:3000/api/lot';
interface addData {
  titre: string;
  duree: string;
  description: string;
  dateFinLot: Date;
  prj_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class LotService {
  constructor(private http: HttpClient) {}

  createLot(
    titre: string,
    duree: string,
    description: string,
    dateFinLot: Date,
    prj_id: string
  ) {
    const ProjData: addData = {
      titre: titre,
      duree: duree,
      description: description,
      dateFinLot: dateFinLot,
      prj_id: prj_id,
    };

    console.log(ProjData);
    return this.http.post<{ message: string }>(`${BACKEND_URL}/`, ProjData);
  }

  getLots() {
    return this.http.get<{ message: string; lots: Lot[] }>(`${BACKEND_URL}/`);
  }

  updateLot(updateLot: Lot) {
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + updateLot.id,
      updateLot
    );
  }
  DeleteLot(idLot: number) {
    console.log('id user ', idLot);

    return this.http.put<{ message: string }>(
      BACKEND_URL + '/desactiver/' + idLot,
      null
    );
  }
}

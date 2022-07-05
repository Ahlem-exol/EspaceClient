import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs/internal/Subscription';
import { Lot } from 'src/app/models/lot.model';
import { Projet } from 'src/app/models/projet.model';

import { LotService } from 'src/app/services/lot/lot.service';
import { ProjetService } from 'src/app/services/projet/projet.service';
@Component({
  selector: 'app-client-desh',
  templateUrl: './client-desh.page.html',
  styleUrls: ['./client-desh.page.scss'],
})
export class ClientDeshPage implements OnInit {
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  doughnutChart: any;
  segmentValue = 1;
  requests: any[] = [];
  donors: any[] = [];
  newHeight = 0;
  sub1: Subscription;
  loadedLotNotFini: Lot[];
  sub2: Subscription;

  loadedProjet: Projet;
  sub3: Subscription;

  loadedLotFini: Lot[];
  constructor(
    private menu: MenuController,
    private LotService: LotService,
    private ProjetService: ProjetService
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.sub3 = this.ProjetService.getProjet(1).subscribe((projetData) => {
      this.loadedProjet = projetData.projet;
      console.log(this.loadedProjet.perNonReal);

      this.doughnutChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Realise', 'en cours'],
          datasets: [
            {
              label: '# % de Lot',

              data: [
                this.loadedProjet.perRealise,
                this.loadedProjet.perNonReal,
              ],
              backgroundColor: ['#ce1c1c', '#e0e0e0'],
              hoverBackgroundColor: ['#ce1c1c', '#e0e0e0'],
            },
          ],
        },
        options: {
          layout: {
            padding: {
              left: 0,
            },
          },
        },
      });
    });
  }

  scroll(event) {
    const value = event.detail.scrollTop;
    console.log(value);
    if (value > 20) {
      this.newHeight += 15;
      console.log('pandd', 120 - this.newHeight);
    } else {
      this.newHeight = 0;
      console.log('pandd', 120 - this.newHeight);
    }

    if (value > 400 && this.newHeight <= 56) {
      this.newHeight += 100;
    }
  }

  ngOnInit() {
    this.sub1 = this.LotService.getLotsNotFini().subscribe((Lotsdata) => {
      this.loadedLotNotFini = Lotsdata.lots;
      this.donors = this.loadedLotNotFini;
    });
    this.sub2 = this.LotService.getLotsFini().subscribe((Lotsdata) => {
      this.loadedLotFini = Lotsdata.lots;
      this.requests = this.loadedLotFini;
    });

    // this.doughnutChartMethod();
    // liste lot en attent
    // liste  lot fini
    //list lot en cours
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs/internal/Subscription';
import { Lot } from 'src/app/models/lot.model';

import { LotService } from 'src/app/services/lot/lot.service';
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
  loadedLotFini: Lot[];
  constructor(private menu: MenuController, private LotService: LotService) {
    this.menu.enable(true, 'custom-menu');
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Realise', 'en cours', 'en attent'],
        datasets: [
          {
            label: '# de Lot',

            data: [12, 22, 66],
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
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
  }

  scroll(event) {
    const value = event.detail.scrollTop;
    console.log(value);
    if (value > 40) {
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
    console.log('ngonite ');
    this.sub1 = this.LotService.getLotsNotFini().subscribe((Lotsdata) => {
      this.loadedLotNotFini = Lotsdata.lots;
      this.donors = this.loadedLotNotFini;
      console.log(this.loadedLotNotFini);
    });
    this.sub2 = this.LotService.getLotsFini().subscribe((Lotsdata) => {
      this.loadedLotFini = Lotsdata.lots;
      this.requests = this.loadedLotFini;
      console.log(this.loadedLotFini);
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

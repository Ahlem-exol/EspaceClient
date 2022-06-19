import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Chart from 'chart.js/auto';

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
  constructor(private menu: MenuController) {
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

    if (value > 166 && this.newHeight <= 166) {
      this.newHeight += 50;
    }
  }

  ngOnInit() {
    console.log('ngonite ');
    // this.doughnutChartMethod();

    this.requests = [
      { id: 1, name: 'LOT N°1', descreption: 'Etude' },
      { id: 2, name: 'LOT N°2', descreption: 'Achat Materiel' },
      { id: 3, name: 'LOT N°3', descreption: 'Prototyp' },
      { id: 4, name: 'LOT N°3', descreption: 'Prototyp' },
      { id: 5, name: 'LOT N°3', descreption: 'Prototyp' },
      { id: 6, name: 'LOT N°3', descreption: 'Prototyp' },
      { id: 7, name: 'LOT N°3', descreption: 'Prototyp' },
    ];

    this.donors = [
      { id: 1, name: 'LOT N°4', descreption: 'Realisation produit 1' },
      { id: 2, name: 'LOT N°5', descreption: 'Realisation producit 2' },
      { id: 3, name: 'LOT N°5', descreption: 'sfsdfsdfs' },
    ];
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
}

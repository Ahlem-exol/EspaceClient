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

  constructor(private menu: MenuController) {
    this.menu.enable(true, 'custom-menu');
  }

  // When we try to call our chart to initialize methods in ngOnInit() it shows an error nativeElement of undefined.
  // So, we need to call all chart methods in ngAfterViewInit() where @ViewChild and @ViewChildren will be resolved.
  ngAfterViewInit() {
    console.log('ngAfterVeiwer ');

    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart.height = 500;
    this.doughnutChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['BJP', 'Congress', 'AAP', 'CPM', 'SP'],
        datasets: [
          {
            label: '# of Votes',

            data: [50, 29, 15, 10, 7],
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            hoverBackgroundColor: [
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
            ],
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

  ngOnInit() {
    console.log('ngonite ');
    // this.doughnutChartMethod();

    this.requests = [
      { id: 1, name: 'qsfhs djfhdsf', descreption: 'sfsdfsdfs' },
      { id: 2, name: 'qsfhsd  jfhdsf', descreption: 'sfsdfsdfs' },
      { id: 3, name: 'qsfhsdjfhdsf', descreption: 'sfsdfsdfs' },
    ];

    this.donors = [
      { id: 1, name: 'qsfhsdjfhdsf', descreption: 'sfsdfsdfs' },
      { id: 2, name: 'qsfhsdjfhdsf', descreption: 'sfsdfsdfs' },
      { id: 3, name: 'qsfhsdjfhdsf', descreption: 'sfsdfsdfs' },
    ];
  }

  segmentChanged(event) {
    console.log(event);
    this.segmentValue = event.detail.value;
  }
}

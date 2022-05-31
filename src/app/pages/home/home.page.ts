import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('lineCanvas') LineCnavas: ElementRef;
  segmentValue = 1;
  requests: any[] = [];
  donors: any[] = [];
  lineChart: any;
  constructor() {}

  ngOnInit() {
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

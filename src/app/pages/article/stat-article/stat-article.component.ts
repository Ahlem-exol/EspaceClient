import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-stat-article',
  templateUrl: './stat-article.component.html',
  styleUrls: ['./stat-article.component.scss'],
})
export class StatArticleComponent implements OnInit {
  @ViewChild(IonDatetime) datetime: IonDatetime;
  @Input() article: Article;
  dateValue: any;

  constructor(
    private modelControl: ModalController,
    private ArticelService: ArticleService
  ) {}

  confirm() {
    this.datetime.confirm(true);
  }
  reset() {
    this.datetime.reset();
  }
  formatDate1(value: string) {
    this.dateValue = format(parseISO(value), 'yyyy-MM-dd');
    console.log(this.dateValue);
    return format(parseISO(value), 'yyyy-MM-dd');
  }

  ngOnInit() {
    // this.datedebut = this.navParams.get('datedebut');
    // console.log('From the construction', this.datedebut);
  }

  _dismiss() {
    this.modelControl.dismiss();
  }
  UpdateEtatLot(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const percentage = form.value.percentage;
    const dateUpdate = this.dateValue;
    const lot_id = this.article.id;

    this.ArticelService.updateLotStat(percentage, dateUpdate, lot_id).subscribe(
      (result) => {
        form.reset();
      },
      (error) => {}
    );
  }
}

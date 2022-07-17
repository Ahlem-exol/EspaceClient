import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { StatLot } from 'src/app/models/statLot.model';
import { ArticleService } from 'src/app/services/article/article.service';

@Component({
  selector: 'app-statdetail-article',
  templateUrl: './statdetail-article.component.html',
  styleUrls: ['./statdetail-article.component.scss'],
})
export class StatdetailArticleComponent implements OnInit {
  @Input() article: Article;
  sub: Subscription;
  loadedStat: StatLot[];
  constructor(
    private modelControl: ModalController,
    private toastController: ToastController,
    private ArticleService: ArticleService
  ) {}

  ngOnInit() {
    this.sub = this.ArticleService.getLotStaTs(this.article.id).subscribe(
      (Lotsdata) => {
        this.loadedStat = Lotsdata.lotstats;
        console.log(this.loadedStat);
      }
    );
  }
}

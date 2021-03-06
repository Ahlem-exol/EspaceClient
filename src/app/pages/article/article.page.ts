import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Lot } from 'src/app/models/lot.model';
import { ArticleService } from 'src/app/services/article/article.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AddArticleComponent } from './add-article/add-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { StatArticleComponent } from './stat-article/stat-article.component';
import { StatdetailArticleComponent } from './statdetail-article/statdetail-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  date = new Date();
  nameUser: any;
  idSession: number;
  sub: Subscription;
  loadedArticle: Article[];
  tablestyle = 'bootstrap'; // dark
  lot: number;
  constructor(
    public modalController: ModalController,
    private router: Router,
    private menu: MenuController,
    private ArticleService: ArticleService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.menu.enable(true, 'custom-menu');
  }

  async _openModal() {
    const modal = await this.modalController.create({
      component: AddArticleComponent,
    });
    return await modal.present();
  }

  async _openModalUpdate(article: Article) {
    const modal = await this.modalController.create({
      component: UpdateArticleComponent,
      componentProps: { article },
    });
    return await modal.present();
  }

  async _openModalDelete(article: Article) {
    console.log(this.authService.getAuthData());
    console.log(article.id);
    const modal = await this.modalController.create({
      component: DeleteArticleComponent,
      componentProps: { article },
    });
    return await modal.present();
  }
  // calle the focntions

  async _UpdateStat(article: Article) {
    console.log(this.authService.getAuthData());
    console.log(article.id);
    const modal = await this.modalController.create({
      component: StatArticleComponent,
      componentProps: { article },
    });
    return await modal.present();
  }

  async _DetailStat(article: Article) {
    console.log(this.authService.getAuthData());
    console.log(article.id);
    const modal = await this.modalController.create({
      component: StatdetailArticleComponent,
      componentProps: { article },
    });
    return await modal.present();
  }

  ngOnInit() {
    this.nameUser =
      this.authService.getAuthData().nom +
      ' ' +
      this.authService.getAuthData().prenom;
    this.idSession = parseInt(this.authService.getAuthData().id);

    this.lot = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.sub = this.ArticleService.getArticle(this.lot).subscribe(
      (Articlesdata) => {
        this.loadedArticle = Articlesdata.Articles;
        console.log(this.loadedArticle);
      }
    );
  }
}

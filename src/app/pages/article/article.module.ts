import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';

import { ArticlePage } from './article.page';
import { AddArticleComponent } from './add-article/add-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StatArticleComponent } from './stat-article/stat-article.component';
import { StatdetailArticleComponent } from './statdetail-article/statdetail-article.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [
    ArticlePage,
    AddArticleComponent,
    UpdateArticleComponent,
    DeleteArticleComponent,
    StatArticleComponent,
    StatdetailArticleComponent,
  ],
  entryComponents: [
    ArticlePage,
    AddArticleComponent,
    UpdateArticleComponent,
    DeleteArticleComponent,
    StatArticleComponent,
    StatdetailArticleComponent,
  ],
})
export class ArticlePageModule {}

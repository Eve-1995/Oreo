import { NgModule } from '@angular/core';
import { AppArticleDetailComponent } from './article-detail.component';
import { NgxMdModule } from 'ngx-md';
import { ThemeModule } from '../../../@theme/theme.module';
import { ClipboardModule } from 'ngx-clipboard';
import { AppArticleDetailReplyComponent } from './article-detail-reply.component';

@NgModule({
    imports: [
        NgxMdModule.forRoot(),
        ThemeModule,
        ClipboardModule
    ],
    declarations: [
        AppArticleDetailComponent,
        AppArticleDetailReplyComponent
    ],
    entryComponents: [
        AppArticleDetailReplyComponent
    ],
    exports: [AppArticleDetailComponent]
})
export class ArticleDetailModule { }

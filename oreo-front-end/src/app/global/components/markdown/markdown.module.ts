import { NgModule } from '@angular/core';
import { MarkdownComponent } from './markdown.component';
import { FormsModule } from '@angular/forms';
import { EditorMdDirective } from './editor-md.directive';

@NgModule({
    imports: [
      FormsModule
    ],
    declarations: [
      EditorMdDirective,
      MarkdownComponent
    ],
    exports: [MarkdownComponent]
})
export class MarkdownlModule { }

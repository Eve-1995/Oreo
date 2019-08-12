import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EditorConfig } from './editor-md.directive';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html'
})
export class MarkdownComponent implements OnInit {
  ngOnInit(): void {
    const element = document.querySelector('#nb-global-spinner');
    element.remove();
  }
  conf = new EditorConfig();
  markdown = '### title1';

  // 同步属性内容
  syncModel(str): void {
    this.markdown = str;
  }
}

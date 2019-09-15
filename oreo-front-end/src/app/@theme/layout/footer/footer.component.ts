import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class AppFooterComponent {
  public getEasyEgg(): void {
    this.httpClient.get('fragment/easyEgg').subscribe();
  }

  constructor(
    private httpClient: HttpClient
  ) { }
}

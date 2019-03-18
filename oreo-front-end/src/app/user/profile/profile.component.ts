import { Component } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss'],
  providers: [ProfileService],
})
export class AppProfileComponent {
}

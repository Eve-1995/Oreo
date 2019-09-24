import { NgModule } from '@angular/core';
import { BossRoutingModule, bossRouteComponents } from './boss-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BossRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ...bossRouteComponents,
  ]
})
export class BossModule {
}

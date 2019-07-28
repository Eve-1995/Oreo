import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbToastrModule,
  NbChatModule,
  NbCardModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbListModule,
  NbInputModule,
  NbAccordionModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbTooltipModule,
  NbCalendarKitModule,
} from '@nebular/theme';

import { LayoutComponent } from './layout';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { AppHeaderComponent } from './layout/header/header.component';
import { AppFooterComponent } from './layout/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from '../global/interceptor';
import { NgxMdModule } from 'ngx-md';
import { AppConfirmComponent } from '../global/components/confirm/confirm.component';
import { AppSvgComponent } from '../global/components/svg/svg.component';

// Nebular组件
const NB_MODULES = [
  NbCardModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NgbModule,
  NbProgressBarModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbStepperModule,
  NbButtonModule,
  NbListModule,
  NbToastrModule,
  NbInputModule,
  NbAccordionModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbAlertModule,
  NbSpinnerModule,
  NbRadioModule,
  NbSelectModule,
  NbChatModule,
  NbTooltipModule,
  NbCalendarKitModule,
];
// 布局文件
const COMPONENTS = [
  AppHeaderComponent,
  AppFooterComponent,
  LayoutComponent,
];
// 全局子组件
const CHILD_COMPONENTS = [
  AppConfirmComponent,
  AppSvgComponent,
];

const BASE_MODULES = [CommonModule, FormsModule, ReactiveFormsModule];

const NB_THEME_PROVIDERS = [
  NgxMdModule.forRoot().providers,
  ...NbThemeModule.forRoot({ name: 'cosmic' }, [COSMIC_THEME]).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ...NbDatepickerModule.forRoot().providers,
  ...NbDialogModule.forRoot().providers,
  ...NbWindowModule.forRoot().providers,
  ...NbToastrModule.forRoot().providers
];

@NgModule({
  imports: [...NB_MODULES, ...BASE_MODULES],
  exports: [...NB_MODULES, ...BASE_MODULES, ...COMPONENTS, ...CHILD_COMPONENTS],
  declarations: [...COMPONENTS, ...CHILD_COMPONENTS],
  entryComponents: [...CHILD_COMPONENTS]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        httpInterceptorProviders,
        ...NB_THEME_PROVIDERS
      ],
    };
  }
}

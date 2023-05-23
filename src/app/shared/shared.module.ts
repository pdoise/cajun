import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ErrorPageComponent } from './layout/error-page/error-page.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PrimaryLayoutComponent } from './layout/primary-layout/primary-layout.component';
import { TrowserLayoutComponent } from './layout/trowser-layout/trowser-layout.component';

import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TextFilterComponent } from './components/text-filter/text-filter.component';

import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { WhitelistKeysPipe } from './pipes/whitelist-keys.pipe';

const components = [
  ErrorPageComponent,
  ActionModalComponent,
  ModalComponent,
  PaginationComponent,
  TextFilterComponent,
  NavbarComponent,
  FooterComponent,
  PrimaryLayoutComponent,
  TrowserLayoutComponent,
]

const pipes = [
  SearchFilterPipe,
  WhitelistKeysPipe
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    components,
    pipes,
  ],
  exports: [
    components,
    pipes,
  ],
  providers: [
  ]
})
export class SharedModule {}

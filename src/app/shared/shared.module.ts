import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

import { CheckboxSelectComponent } from './components/checkbox-select/checkbox-select.component';
import { TextFilterComponent } from './components/text-filter/text-filter.component';

import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { WhitelistKeysPipe } from './pipes/whitelist-keys.pipe';

const components = [
  CheckboxSelectComponent,
  NavbarComponent,
  FooterComponent,
  TextFilterComponent
]

const pipes = [
  SearchFilterPipe,
  WhitelistKeysPipe
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServeErrorMessageComponent } from './components/serve-error-message/serve-error-message.component';

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServeErrorMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadCrumbComponent,
    RouterModule,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServeErrorMessageComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }

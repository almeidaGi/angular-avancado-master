import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './Entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { IMaskModule } from 'angular-imask';
import {CalendarModule} from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent    
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,  
    IMaskModule,
    RouterModule,
    SharedModule,
    CalendarModule,
    TranslateModule,  
    ToastrModule.forRoot(), 
  ]
})
export class EntriesModule { }

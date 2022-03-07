import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './Entry-form/entry-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent    
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,    
    ToastrModule.forRoot(), 
  ]
})
export class EntriesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryFormComponent,     
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),  
       
  ]
})
export class CategoriesModule { }

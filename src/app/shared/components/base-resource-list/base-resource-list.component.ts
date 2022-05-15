import {  Directive, OnInit } from '@angular/core';
import { BaseResouceModel } from '../../models/base-resource.model';
import { BaseResouceService } from '../../services/base-resource.service';
@Directive()
export abstract class BaseResourceListComponent<T extends BaseResouceModel> implements OnInit {
  resources:T [] = [];

  constructor(protected resouceService: BaseResouceService<T>) { }

  ngOnInit(): void {
    this.resouceService.getAll().subscribe({
     next:(resources) => this.resources = resources.sort((a,b)=> a.id - b.id),
     error:(error) => alert('Erro ao carregar a lista.')
    })
  }
  deleteResources(resources: T) {
    const confirmDelet = confirm('Deseja realmente excluir item?');
    if (confirmDelet) {
      this.resouceService.delete(resources.id).subscribe({
        next: () => this.resources = this.resources.filter(element => element != resources),
        error: () => alert('Erro na tentivava de exclusão')
      })
    }
  }
}

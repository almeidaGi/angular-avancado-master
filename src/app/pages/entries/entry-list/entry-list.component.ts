import { Component, OnInit } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.entryService.getAll().subscribe({
      next: (entries) => this.entries = entries.sort((a,b)=> b.id - a.id),
      error: (error) => alert('Erro ao carregar a lista.')
    })
  }
  deleteEntry(entry: any) {
    const confirmDelet = confirm('Deseja realmente deletar a categoria?');
    if (confirmDelet) {
      this.entryService.delete(entry.id).subscribe({
        next: () => this.entries = this.entries.filter(element => element != entry),
        error:() => alert('Erro na tentivava de exclusão')
      })
    }
  }
}

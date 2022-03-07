import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction!: string;
  entryForm!: FormGroup;
  pageTitle!: string;
  descriptionEntrySmall!: string;
  serverErrorMessages!: string[];
  submittingForm = false;
  entry: Entry = new Entry();

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
  }
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  public submitForm() {
    this.submittingForm = true;
    if (this.currentAction == "new") {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new"
    } else
      this.currentAction = "edit"
  }
  private buildEntryForm() {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: [null],
      type: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      date:  new FormControl(null, [Validators.required]),
      paid:  new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),

    })
  }

  get name(): any { return this.entryForm.get('name'); }
  get description(): any { return this.entryForm.get('description'); }

  private loadEntry() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getById(+params.get('id')!))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(this.entry)
        },
        (error) => alert('Ocorreu um erro no servidor, por favor tente mais tarde.')
      )
    }
  }
  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de novo lançamento'
    } else {
      const nameEntry = this.entry.name || "";
      const descriptionSmall = this.entry.description || "";
      this.pageTitle = nameEntry;
      this.descriptionEntrySmall = descriptionSmall
    }
  }
  public back(){
    this.router.navigateByUrl("entries", { skipLocationChange: true }).then(
      () => this.router.navigate(["entries"])
    )
  }
  private updateEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.update(entry).subscribe(
      entry => this.actionFormSuccess(entry),
      error => this.actionsForError(error)
    )
  }

  public createEntry() {
    const entry: Entry = Object.assign(new Entry(), this.entryForm.value);
    this.entryService.create(entry).subscribe(
      entry => this.actionFormSuccess(entry),
      error => this.actionsForError(error)
    )

  }
  private actionFormSuccess(entry: Entry) {
    if (entry.id != this.entry.id) {
      this.toastr.success("Lançamento criado com sucesso");
      this.router.navigateByUrl("entries", { skipLocationChange: true }).then(
        () => this.router.navigate(["entries", entry.id, "edit"])
      )
    } else {
      this.toastr.success("Lançamento atualizado com sucesso ");

      this.router.navigateByUrl("entries", { skipLocationChange: true }).then(
        () => this.router.navigate(["entries", entry.id, "edit"])
      )
    }
  }
  private actionsForError(error: any) {
    this.toastr.error("Ocorreu um erro ao processar a sua solicitação");
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }
    else {
      this.serverErrorMessages = ["Falha na comunicação com o servidor, por favor, tente mais."]
    }
  }
}

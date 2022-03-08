import { Component, OnInit, AfterContentChecked, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Category } from '../../categories/shared/category.module';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked, OnChanges {

  currentAction!: string;
  entryForm!: FormGroup;
  pageTitle!: string;
  descriptionEntrySmall!: string;
  serverErrorMessages!: string[];
  submittingForm = false;
  entry: Entry = new Entry();
  entryList: Entry[] = [];
  categories!: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    redix: ',',
  }
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.loadCategory();
  }
  ngOnChanges(changes: SimpleChanges): void {
  
    this.typeOptions
    
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
  get typeOptions(): Array<any>{
     return Object.entries(Entry.types).map(
      ([ text])=> {
        console.log(text);
          return{
            text: text,
          }
      }
    )
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
      type: new FormControl("expense", [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      date: new FormControl(null, [Validators.required]),
      paid: new FormControl(true, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),

    })
  }

  get type(): any { return this.entryForm.get('type'); }
  get name(): any { return this.entryForm.get('name'); }
  get description(): any { return this.entryForm.get('description'); }
  get amount(): any { return this.entryForm.get('amount'); }
  get date(): any { return this.entryForm.get('date'); }
  get paid(): any { return this.entryForm.get('paid'); }  
  get categoryId(): any { return this.entryForm.get('categoryId'); }

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
  private loadCategory(){
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
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
      this.entryService.getAll();
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

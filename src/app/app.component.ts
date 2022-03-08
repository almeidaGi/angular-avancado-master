import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projetcLoja';
  showMenuUser = false;
  constructor(private config: PrimeNGConfig, private translateService: TranslateService){

  }

  ngOnInit() {
    this.translateService.setDefaultLang('ptBR');
    this.config.setTranslation({
      firstDayOfWeek: 0,
       dayNames: [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado'
        ],
        dayNamesShort: [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sab'
        ],
        dayNamesMin: [
            'Do',
            'Se',
            'Te',
            'Qu',
            'Qu',
            'Se',
            'Sa'
        ],
        monthNames: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ],
         monthNamesShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez'
        ],
        'today': 'Hoje',
        'clear': 'Limpar'
  });
  }
  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
}
}

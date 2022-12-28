import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  pageTitle = "Relatórios de despesas"
  public date = new Date();
  public year = +this.date.getUTCFullYear();  
  public pastYears = +this.year - 5;  
  public yearList: Array<any> = [];
  constructor()
  {  
   for (let index = this.pastYears; index <= this.year; index++) {   
    this.yearList.push({
      value: index ,
      description: index});
   }
   this.yearList.reverse() 
  }
 public meses = [
    {
      value: '',
      description: 'Selecione um mês'
    },
    {
      value: 1,
      description: 'Janeiro'
    },
    {
      value: 2,
      description: 'Fevereiro'
    },
    {
      value: 3,
      description: 'Fevereiro'
    },
    {
      value: 4,
      description:  'Abril'
    },
    {
      value: 5,
      description:   'Maio'
    },
    {
      value: 6,
      description:   'Junho'
    },
    {
      value: 7,
      description:   'Julho'
    },
    {
      value: 8,
      description: 'Agosto'
    },
    {
      value: 9,
      description: 'Setembro'
    },
    {
      value: 10,
      description: 'Outubro'
    },
    {
      value: 11,
      description: 'Novembro'
    },
    {
      value: 12,
      description: 'Dezembro'
    },
  ]
public generateReports(){}
}

import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocumentStatisticService} from "../../../module/document/service/document.statistic.service";
import {Statistic} from "../../../module/document/model/statistic";
import {ChartComponent} from "angular2-chartjs";

@Component({
  selector: 'app-statistic.modal',
  templateUrl: './statistic.modal.component.html',
  styleUrls: ['./statistic.modal.component.scss']
})
export class StatisticModalComponent implements OnInit, AfterViewInit {

  @ViewChild("pieChart") pieChart: ChartComponent | undefined;
  @ViewChild("barChart") barChart: ChartComponent | undefined;

  public title: string = "";
  type: number = 0;

  options: number[] = [5, 10, 15];
  selectedOption: number = 5;

  barChartConfig: any = {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: []
        }
      ]
    }
  }

  pieChartConfig: any = {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: []
        }
      ]
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StatisticModalComponent>,
    private statisticService: DocumentStatisticService
  ) { }

  private processReportData(data: Statistic[]): void {
    const labels = data.map(x => x.name);
    const values = data.map(x => x.value);

    this.barChartConfig.data.labels = labels;
    this.barChartConfig.data.datasets[0].data = values;

    this.pieChartConfig.data.labels = labels;
    this.pieChartConfig.data.datasets[0].data = values;

    this.pieChartConfig.data.datasets[0].backgroundColor = labels.map(() => this.getRandomColor());

    this.barChart?.chart.update();
    this.pieChart?.chart.update();
  }

  private fetchReportData(): void {
    this.statisticService.getStatisticData(this.type, this.selectedOption)
      .subscribe(response => {
        this.processReportData(response.data);
      });
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.type = this.data.type;

    this.barChartConfig.data.datasets[0].label = this.data.title;
  }

  ngAfterViewInit() {
    this.fetchReportData();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  optionChanged(): void {
    this.fetchReportData();
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

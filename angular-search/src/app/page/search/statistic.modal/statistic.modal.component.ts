import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DocumentStatisticService} from "../../../module/document/service/document.statistic.service";
import {Statistic} from "../../../module/document/model/statistic";
import {ChartComponent} from "angular2-chartjs";
import {DocumentMetadata} from "../../../module/document/model/document.metadata";

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
  bookmarked: boolean = false;

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

  filterValues: any[] = [];

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

    const colors = labels.map(() => this.getRandomColor());

    this.pieChartConfig.data.datasets[0].backgroundColor = colors;
    this.barChartConfig.data.datasets[0].backgroundColor = colors;

    this.barChart?.chart.update();
    this.pieChart?.chart.update();
  }

  private fetchReportData(): void {
    this.statisticService.getStatisticData(this.bookmarked, this.type, this.selectedOption)
      .subscribe(response => {
        this.processReportData(response.data);
      });
  }

  private prepareFilterValues(props: DocumentMetadata[], filterValues: any): void {

  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.type = this.data.type;
    this.bookmarked = this.data.bookmarked;

    this.data.docProps.forEach((prop: DocumentMetadata) => {
      const note = prop.note?.replace(/\(.+\)/, "").trim();
      if (prop.type !== "date") {
        if (this.data.filterValue[prop.name]) {
          this.filterValues.push({
            label: note,
            value: this.data.filterValue[prop.name]
          });
        }
      } else {
        const from = prop.name + "from";
        const to = prop.name + "to";

        if (this.data.filterValue[from] && this.data.filterValue[to]) {
          this.filterValues.push({
            label: note,
            value: this.data.filterValue[from] + " - " + this.data.filterValue[to]
          });
        }
      }
    });

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

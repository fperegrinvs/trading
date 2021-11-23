import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-statistic.modal',
  templateUrl: './statistic.modal.component.html',
  styleUrls: ['./statistic.modal.component.scss']
})
export class StatisticModalComponent implements OnInit {

  public title: string = "";

  barChartConfig: any = {
    type: "bar",
    data: {
      labels: ["Quốc Khánh", "Thiên An", "Băng Di", "Thanh Thảo", "Văn Cường", "Thanh Long", "Nguyên Hà"],
      datasets: [
        {
          label: "",
          data: [85, 5, 82, 87, 52, 53, 53]
        }
      ]
    }
  }

  pieChartConfig: any = {
    type: "pie",
    data: {
      labels: ["Phòng tài chính", "Phòng nhân sự", "Phòng cơ sở vật chất", "Ban giám đốc", "Bộ phận kho"],
      datasets: [
        {
          label: "",
          data: [13, 27, 5, 11, 6],
          backgroundColor: ["#FBF46D", "#B4FE98", "#77E4D4", "#998CEB", "#FFC286"]
        }
      ]
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StatisticModalComponent>
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.barChartConfig.data.datasets[0].label = this.data.title;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}

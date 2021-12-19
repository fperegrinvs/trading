import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildActivationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TableAlignment, TableColumn } from 'src/app/module/common/model/TableColumn';
import { DocumentSearchService } from 'src/app/module/document/service/document.search.service';
import { UIService } from 'src/app/service/ui.service';
import { ApproveModalComponent } from './approve.modal/approve.modal.component';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  tableColumns: TableColumn[] = [];
  tableData: any[] = [];
  totalItems: number = 0;
  
  tableColumnsPrepared$: Subject<boolean> = new Subject();

  constructor(
    private documentService: DocumentSearchService,
    private dialogService: MatDialog,
    private uiService: UIService
  ) { }

  private prepareTableColumns(): void {
    this.documentService.getDocProps()
      .subscribe(res => {
        this.tableColumns = res.props.filter(x => x.name === "signNumber" || x.name === "subject" || x.name === "createdBy")
          .map(x => {
            const column: TableColumn = {
              id: x.name,
              text: x.note ? x.note?.replace(/\(.+\)/gi, "").trim() : "",
              headerAlign: TableAlignment.LEFT,
              cellAlign: TableAlignment.LEFT,
              active: true
            };

            return column;
          });
        
        this.tableColumnsPrepared$.next(true);
      });
  }

  private prepareTableData(): void {
    this.documentService.getNeedApproval(1, 20)
      .subscribe(res => {
        this.tableData = res.hits.map(x => {
          if (x._source.createdBy) {
            x._source.createdBy = x._source.createdBy.name;
          }
          
          return x._source;
        });

        this.totalItems = res.total_row;
      })
  }

  ngOnInit(): void {
    this.prepareTableColumns();

    this.tableColumnsPrepared$.pipe(debounceTime(200))
      .subscribe(() => {
        this.prepareTableData();
      })
  }

  openApproveDetail(data: any) {
    const dialogRef = this.dialogService.open(ApproveModalComponent, {
      data: {
        doc: data
      },
      width: "100%"
    });

    dialogRef.afterClosed()
      .subscribe(res => {
        if (res.refresh) {
          this.prepareTableData();
          this.uiService.updateApproveCount();
        }
      });
  }
}

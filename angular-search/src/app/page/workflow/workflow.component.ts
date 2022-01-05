import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TableAlignment, TableColumn } from 'src/app/module/common/model/TableColumn';
import { Workflow, WorkflowStage } from 'src/app/module/document/model/workflow';
import { DocumentFlowService } from 'src/app/module/document/service/document.flow.service';
import Swal from 'sweetalert2';
import { ModalAddStageComponent } from './modal.add.stage/modal.add.stage.component';
import { ModalAddComponent } from './modal.add/modal.add.component';
import {AuthenticationService} from "../../module/authentication/service/authentication.service";

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  tableColumns: TableColumn[] = [
    {
      id: "no",
      text: "STT",
      headerAlign: TableAlignment.CENTER,
      cellAlign: TableAlignment.CENTER,
      active: true,
      bold: true
    },
    {
      id: "name",
      text: "Tên quy trình",
      headerAlign: TableAlignment.LEFT,
      cellAlign: TableAlignment.LEFT,
      active: true
    }
  ]

  tableData: any[] = [];
  selectedFlow: any = {};
  faEdit: IconDefinition = faEdit;
  faTrash: IconDefinition = faTrashAlt;
  isAdminRole: boolean = false;

  constructor(
    private documentFlowService: DocumentFlowService,
    private dialogService: MatDialog,
    private authService: AuthenticationService
  ) { }

  private getWorkflows(): void {
    this.documentFlowService.getWorkflows()
    .subscribe((res: Workflow[]) => {
      const flows: any[] = [];

      res.forEach((flow, idx) => {
        flows.push({
          id: flow.id,
          no: idx + 1,
          name: flow.name,
          desc: flow.description,
          stages: flow.stages,
          global: flow.global
        });
      });

      this.tableData = flows;
      this.selectedFlow = flows[0];
    });
  }

  ngOnInit(): void {
    this.isAdminRole = this.authService.getCookieAuthInfo()?.user.isadmin || false;
    this.getWorkflows();
  }

  removeStage(stage: WorkflowStage): void {
    Swal.fire({
      title: "Xác nhận xoá bước quy trình?",
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.documentFlowService.removeStage(this.selectedFlow.id, stage.id)
      .subscribe(res => {
        if (res) {
          this.refreshStages();
        }
      });
      }
    });
  }

  deleteWorkflow(workflow: any): void {
    Swal.fire({
      title: "Xác nhận xoá quy trình?",
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        this.documentFlowService.deleteWorkflow(workflow.id)
          .subscribe((res: boolean) => {
            if (res) {
              this.getWorkflows();
            }
          })
      }
    })
  }

  openAddForm(): void {
    this.dialogService.open(ModalAddComponent)
      .afterClosed().subscribe(res => {
        if (res) {
          this.getWorkflows();
        }
      })
  }

  openFlow(flow: any): void {
    this.documentFlowService.getFlowStages(flow.id)
      .subscribe(res => {
        flow.stages = res;
        this.selectedFlow = flow;
      });
  }

  private refreshStages(): void {
    this.selectedFlow.stages = [];
    this.documentFlowService.getFlowStages(this.selectedFlow.id)
    .subscribe(res => {
      this.selectedFlow.stages = res;
    })
  }

  addStage(): void {
    this.dialogService.open(ModalAddStageComponent, {
      data: this.selectedFlow
    }).afterClosed().subscribe(addSuccess => {
      if (addSuccess) {
        this.refreshStages();
      }
    });
  }
}

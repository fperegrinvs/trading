import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentFlowService } from 'src/app/module/document/service/document.flow.service';
import { Company } from 'src/app/module/management/model/company';
import {CompanyManagementService} from "../../../module/management/service/company.management.service";
import {AuthenticationService} from "../../../module/authentication/service/authentication.service";

@Component({
  selector: 'app-modal.add',
  templateUrl: './modal.add.component.html',
  styleUrls: ['./modal.add.component.scss']
})
export class ModalAddComponent implements OnInit {

  model: any = {
    name: "",
    description: "",
    step: null,
    companyId: -1,
    isGlobal: false
  }

  err: string = "";
  companies: Company[] = [];
  isAdminRole: boolean = false;

  constructor(
    private documentFlowService: DocumentFlowService,
    private dialogRef: MatDialogRef<ModalAddComponent>,
    private companyManagementService: CompanyManagementService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.isAdminRole = this.authService.getCookieAuthInfo()?.user.isadmin || false;
    this.companyManagementService.getAllCompanies()
      .subscribe(res => {
        this.companies = res;
        if (res.length > 0) {
          this.model.companyId = res[0].id;
        }
      })
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  add(): void {
    if (!this.model.name) {
      this.err = "Tên quy trình là thông tin bắt buộc";
      return;
    }

    this.documentFlowService.addWorkflow(this.model)
      .subscribe(res => {
        this.dialogRef.close(res);
      });
  }

}

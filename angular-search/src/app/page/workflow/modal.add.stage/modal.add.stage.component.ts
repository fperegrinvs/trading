import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { WorkflowTypeEnum } from 'src/app/module/document/enum/workflow.type.enum';
import { DocumentFlowService } from 'src/app/module/document/service/document.flow.service';
import { Company } from 'src/app/module/management/model/company';
import { Role } from 'src/app/module/management/model/role';
import { User } from 'src/app/module/management/model/user';
import { CompanyManagementService } from 'src/app/module/management/service/company.management.service';
import { RoleManagementService } from 'src/app/module/management/service/role.management.service';
import { UserManagementService } from 'src/app/module/management/service/user.management.service';

@Component({
  selector: 'app-modal.add.stage',
  templateUrl: './modal.add.stage.component.html',
  styleUrls: ['./modal.add.stage.component.scss']
})
export class ModalAddStageComponent implements OnInit {

  model: any = {

  }

  err: string = ""
  type: number = WorkflowTypeEnum.PERSON;
  companies: Company[] = [];
  roles: Role[] = [];
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUsers: User[] = [];
  selectedCompanyId: number = -1;
  selectedRoles: Role[] = [];
  filteredRoles: Role[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  roleKey: string = "";
  userKey: string = "";

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalAddStageComponent>,
    private companyManagementService: CompanyManagementService,
    private roleManagementService: RoleManagementService,
    private userManagementService: UserManagementService,
    private documentFlowService: DocumentFlowService
  ) {
  }

  ngOnInit(): void {
    this.getCompanies();
    this.getUsers();
  }

  private getCompanies(): void {
    this.companyManagementService.getAllCompanies()
      .subscribe(res => {
        this.companies = res;
        if (res.length > 0) {
          this.selectedCompanyId = res[0].id;
          this.getRoles(this.selectedCompanyId);
        }
      });
  }

  private getRoles(companyId: number): void {
    this.companies.forEach(company => {
      if (company.id === +companyId) {
        this.roles = company.roles;
        this.filteredRoles = company.roles;
      }
    });
  }

  private getUsers(): void {
    this.userManagementService.getAllUsers()
      .subscribe(res => {
        this.users = res;
        this.filteredUsers = res;
      })
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  add(): void {
    const postData = {
      company_id: +this.type === WorkflowTypeEnum.ROLE ? this.selectedCompanyId : null,
      role_id: +this.type === WorkflowTypeEnum.ROLE ? this.selectedRoles[0].id : null,
      user_ids: +this.type === WorkflowTypeEnum.PERSON ? this.selectedUsers.map(x => x.id) : null,
      note: this.model.note,
      order: this.data.stages.length + 1
    }

    this.documentFlowService.addStage(this.data.id, postData)
      .subscribe(res => {
        if (res) {
          this.dialogRef.close(res);
        }
      });
  }

  remove(role: Role): void {
    let idx = -1;
    this.selectedRoles.forEach((elem, i) => {
      if (elem.id === role.id) {
        idx = i;
      }
    })

    if (idx >= 0) {
      this.selectedRoles.splice(idx, 1);
    }
  }

  removeUser(user: User): void {
    let idx = -1;
    this.selectedUsers.forEach((elem, i) => {
      if (elem.id === user.id) {
        idx = i;
      }
    })

    if (idx >= 0) {
      this.selectedUsers.splice(idx, 1);
    }
  }

  addRole($event: MatChipInputEvent): void {

  }

  selected($event: MatAutocompleteSelectedEvent): void {
    const matchRole = this.roles.find(x => x.name === $event.option.viewValue);
    if (matchRole) {
      this.selectedRoles.push(matchRole)
    }
    this.roleKey = "";
    this.roleInput!.nativeElement.value = "";
  }

  selectedUser($event: MatAutocompleteSelectedEvent): void {
    const matchUser = this.users.find(x => x.fullName === $event.option.viewValue);
    if (matchUser) {
      this.selectedUsers.push(matchUser)
    }
    this.userKey = "";
    this.userInput!.nativeElement.value = "";
  }

  get WorkflowTypeEnum() {
    return WorkflowTypeEnum;
  }

  roleSearch($event: any): void {
    if (!this.roleKey) {
      this.filteredRoles = this.roles;
    } else {
      this.filteredRoles = this.roles.filter(x => {
        return x.name.toLowerCase().includes(this.roleKey.toLowerCase());
      });
    }
  }

  userSearch($event: any): void {
    if (!this.userKey) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(x => {
        return x.fullName.toLowerCase().includes(this.userKey.toLowerCase());
      });
    }
  }

  buildNote(): void {

  }

  companyChanged(): void {
    this.roles = [];
    this.filteredRoles = [];
    this.getRoles(this.selectedCompanyId);
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from "@angular/core";
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../model/TreeModel";
import {MatTree, MatTreeNestedDataSource} from "@angular/material/tree";
import { v4 as uuidv4 } from 'uuid';
import * as _ from "lodash";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faChevronDown, faTimes} from "@fortawesome/free-solid-svg-icons";
import { E } from "@angular/cdk/keycodes";

@Component({
  selector: 'Tree',
  template: `
    <mat-accordion multi>
        <mat-expansion-panel *ngFor="let node of data">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{node.name}}
            </mat-panel-title>
          </mat-expansion-panel-header>
          <div>
            <div class="search-container mb-2 px-4">
              <input class="form-control" placeholder="tìm kiếm ..." [value]="node.searchTerm" (keyup)="onSearch(node, search)" #search/>
            </div>
            <div class="tree-option-wrappers">
              <div *ngFor="let option of node.children" class="py-2 cursor-pointer tree-option" (click)="onNodeClick(option)" [class.active]="isNodeActive(option)">
                <Checkbox [checked]="option.active || false"></Checkbox>
                {{option.name}} &nbsp; <small class="node-count font-bold text-red-600" *ngIf="node.count">[{{node.count}}]</small>
              </div>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    <!--<mat-tree [treeControl]="treeControl" [dataSource]="dataSource" #tree>

      <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle (click)="onNodeClick(node)" [class.active]="isNodeActive(node)">
        <Checkbox [checked]="node.active"></Checkbox>
        {{node.name}} &nbsp; <small class="node-count font-bold text-red-600" *ngIf="node.count">[{{node.count}}]</small>
      </mat-tree-node>

      <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
        <div class="mat-tree-node main-node"
             matTreeNodeToggle
             [attr.aria-label]="'Toggle ' + node.name"
             [class.active]="isNodeActive(node)">
          <button>
            <img src="assets/icons/bx-caret-down.svg" *ngIf="treeControl.isExpanded(node)"/>
            <img src="assets/icons/bx-caret-right.svg" *ngIf="!treeControl.isExpanded(node)"/>
          </button>
          {{node.name}}
        </div>
        <div [class.example-tree-invisible]="!treeControl.isExpanded(node)"
             role="group">
          <div class="search-container px-4 py-2">
            <input class="form-control" placeholder="tìm kiếm ..." [value]="node.searchTerm" (keyup)="onSearch(node, search)" #search/>
          </div>
          <div class="tree-node-content">
            <ng-container matTreeNodeOutlet></ng-container>
          </div>
        </div>
      </mat-nested-tree-node>
    </mat-tree>-->
  `,
  styleUrls: ["./tree.component.scss"]
})
export class TreeComponent implements OnInit, OnChanges {

  @Input() data: TreeNode[] = [];
  @Output() onSelect: EventEmitter<TreeNode[]> = new EventEmitter<TreeNode[]>();
  @Output() onSearchToggle: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  faChevronDown: IconDefinition = faChevronDown;
  faTimes: IconDefinition = faTimes;

  originalTreeData: TreeNode[] = [];

  hasChild = (_: number, node: TreeNode) => !!node.children;

  constructor() {
  }

  ngOnInit(): void {
  }

  private populateNodeIds(tree: TreeNode[]): void {
    tree.forEach(parent => {
      parent.inSearchMode = false;
      parent.searchTerm = "";
      parent.children?.forEach(child => {
        child.id = uuidv4();
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      const internalData = changes.data.currentValue;
      this.populateNodeIds(internalData);
      this.originalTreeData = _.cloneDeep(internalData);
    }
  }

  onNodeClick(node: TreeNode): void {
    node.active = !node.active;

    let currentState = _.cloneDeep(this.data);

    currentState = currentState.filter(item => {
      const activeCount = item.children?.filter(x => x.active).length || 0;
      return activeCount > 0;
    }).map(parentNode => {
      parentNode.children = parentNode.children?.filter(x => x.active);
      return parentNode;
    });

    this.onSelect.emit(currentState);
  }

  isNodeActive(node: TreeNode): boolean {
    if (node.active) {
      return true;
    }

    if (node.children) {
      return node.children?.filter(x => x.active).length > 0;
    }

    return false;
  }

  onSearch(node: TreeNode, input: HTMLInputElement): void {
    this.data.forEach((dataNode, idx) => {
      dataNode.searchTerm = input.value;
      if (!input.value) {
        dataNode.children = this.originalTreeData[idx].children;
      } else {
        dataNode.children = this.originalTreeData[idx].children?.filter(x => x.name.toLowerCase().startsWith(input.value.toLowerCase()));
      }
    });
  }
}

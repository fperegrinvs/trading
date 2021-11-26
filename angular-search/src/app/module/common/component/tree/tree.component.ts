import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from "@angular/core";
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../model/TreeModel";
import {MatTree, MatTreeNestedDataSource} from "@angular/material/tree";
import { v4 as uuidv4 } from 'uuid';
import * as _ from "lodash";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {faChevronDown, faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'Tree',
  template: `
    <mat-tree [treeControl]="treeControl" [dataSource]="dataSource" #tree>

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
          <div class="search-container px-4 py-2" *ngIf="node.inSearchMode">
            <input class="form-control" placeholder="tìm kiếm ..."/>
          </div>
          <ng-container matTreeNodeOutlet></ng-container>
          <div class="view-more" *ngIf="!node.inSearchMode" (click)="toggleSearchMode(node)">
            Xem thêm <fa-icon [icon]="faChevronDown"></fa-icon>
          </div>
          <div class="view-more" *ngIf="node.inSearchMode" (click)="toggleSearchMode(node)">
            Đóng <fa-icon [icon]="faTimes"></fa-icon>
          </div>
        </div>
      </mat-nested-tree-node>
    </mat-tree>
  `,
  styleUrls: ["./tree.component.scss"]
})
export class TreeComponent implements OnInit, OnChanges {

  @Input() data: TreeNode[] = [];
  @Output() onSelect: EventEmitter<TreeNode[]> = new EventEmitter<TreeNode[]>();
  @Output() onSearchToggle: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  @ViewChild('tree') tree: MatTree<TreeNode> | undefined;

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource: MatTreeNestedDataSource<TreeNode> = new MatTreeNestedDataSource();

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
      parent.children?.forEach(child => {
        child.id = uuidv4();
      });
    });

    this.originalTreeData = _.cloneDeep(tree);

    tree.forEach(parent => {
      parent.children = parent.children?.slice(0, 5);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      const internalData = changes.data.currentValue;

      this.populateNodeIds(internalData);

      this.dataSource.data = internalData;
      this.treeControl.dataNodes = internalData;

      this.treeControl.expandAll();
    }
  }

  onNodeClick(node: TreeNode): void {
    node.active = !node.active;

    let currentState = _.cloneDeep(this.dataSource.data);

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

  toggleSearchMode(node: TreeNode): void {
    node.inSearchMode = !node.inSearchMode;

    let currentState = _.cloneDeep(this.dataSource.data);
    currentState[0].children = [];

    this.dataSource.data = currentState;

    this.treeControl.expandAll();

    this.onSearchToggle.emit(node);
  }
}

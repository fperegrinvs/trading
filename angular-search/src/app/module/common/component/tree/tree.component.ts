import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../model/TreeModel";
import {MatTreeNestedDataSource} from "@angular/material/tree";
import { v4 as uuidv4 } from 'uuid';
import * as _ from "lodash";

@Component({
  selector: 'Tree',
  template: `
    <mat-tree [treeControl]="treeControl" [dataSource]="dataSource">

      <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle (click)="onNodeClick(node)">
        <mat-checkbox [(ngModel)]="node.active"></mat-checkbox>
        {{node.name}} &nbsp; <small class="node-count font-bold text-red-600" *ngIf="node.count">[{{node.count}}
        ]</small>
      </mat-tree-node>

      <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
        <div class="mat-tree-node main-node" matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
          <button>
            <img src="assets/icons/bxs-folder-open.svg" *ngIf="treeControl.isExpanded(node)"/>
            <img src="assets/icons/bxs-folder.svg" *ngIf="!treeControl.isExpanded(node)"/>
          </button>
          {{node.name}}
        </div>
        <div [class.example-tree-invisible]="!treeControl.isExpanded(node)"
             role="group">
          <ng-container matTreeNodeOutlet></ng-container>
        </div>
      </mat-nested-tree-node>
    </mat-tree>
  `,
  styleUrls: ["./tree.component.scss"]
})
export class TreeComponent implements OnInit, OnChanges {

  @Input() data: TreeNode[] = [];
  @Output() onSelect: EventEmitter<TreeNode[]> = new EventEmitter<TreeNode[]>();

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource: MatTreeNestedDataSource<TreeNode> = new MatTreeNestedDataSource();

  hasChild = (_: number, node: TreeNode) => !!node.children;

  constructor() {
  }

  ngOnInit(): void {
  }

  private populateNodeIds(tree: TreeNode[]): void {
    tree.forEach(parent => {
      parent.children?.forEach(child => {
        child.id = uuidv4();
      });
    });
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
}

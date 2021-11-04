import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../model/TreeModel";
import {MatTreeNestedDataSource} from "@angular/material/tree";

@Component({
  selector: 'Tree',
  template: `
    <mat-tree [treeControl]="treeControl" [dataSource]="dataSource">

      <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle (click)="onNodeClick(node)">
        {{node.name}}
      </mat-tree-node>

      <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
        <div class="mat-tree-node main-node" matTreeNodeToggle [attr.aria-label]="'Toggle ' + node.name">
          <button>
            <img src="assets/icons/bxs-folder-open.svg" *ngIf="treeControl.isExpanded(node)"/>
            <img src="assets/icons/bxs-folder.svg" *ngIf="!treeControl.isExpanded(node)"/>
          </button>
          {{node.name}}
        </div>
        <!-- There is inline padding applied to this div using styles.
            This padding value depends on the mat-icon-button width.  -->
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
  @Output() onSelect: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource: MatTreeNestedDataSource<TreeNode> = new MatTreeNestedDataSource();

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.dataSource.data = changes.data.currentValue;
      this.treeControl.dataNodes = changes.data.currentValue;
      this.treeControl.expandAll();
    }
  }

  onNodeClick(node: TreeNode): void {
    this.onSelect.emit(node);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'RightNav',
  templateUrl: './rightnav.component.html',
  styleUrls: ['./rightnav.component.scss']
})
export class RightNavComponent implements OnInit {

  userName: string = "Ngô Tuấn Khoa";
  isShow: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

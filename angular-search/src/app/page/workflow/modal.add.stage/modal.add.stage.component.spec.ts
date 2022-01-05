import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal.Add.StageComponent } from './modal.add.stage.component';

describe('Modal.Add.StageComponent', () => {
  let component: Modal.Add.StageComponent;
  let fixture: ComponentFixture<Modal.Add.StageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Modal.Add.StageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal.Add.StageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

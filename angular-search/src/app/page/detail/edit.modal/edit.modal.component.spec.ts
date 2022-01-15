import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit.ModalComponent } from './edit.modal.component';

describe('Edit.ModalComponent', () => {
  let component: Edit.ModalComponent;
  let fixture: ComponentFixture<Edit.ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Edit.ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Edit.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

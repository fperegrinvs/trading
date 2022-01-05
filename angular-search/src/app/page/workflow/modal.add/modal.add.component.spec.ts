import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal.AddComponent } from './modal.add.component';

describe('Modal.AddComponent', () => {
  let component: Modal.AddComponent;
  let fixture: ComponentFixture<Modal.AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Modal.AddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Modal.AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

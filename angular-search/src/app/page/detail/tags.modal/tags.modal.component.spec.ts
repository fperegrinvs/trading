import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tags.ModalComponent } from './tags.modal.component';

describe('Tags.ModalComponent', () => {
  let component: Tags.ModalComponent;
  let fixture: ComponentFixture<Tags.ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tags.ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tags.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

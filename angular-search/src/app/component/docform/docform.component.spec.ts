import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocformComponent } from './docform.component';

describe('DocformComponent', () => {
  let component: DocformComponent;
  let fixture: ComponentFixture<DocformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

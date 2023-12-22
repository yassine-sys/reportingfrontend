import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatedCdrComponent } from './duplicated-cdr.component';

describe('DuplicatedCdrComponent', () => {
  let component: DuplicatedCdrComponent;
  let fixture: ComponentFixture<DuplicatedCdrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicatedCdrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicatedCdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

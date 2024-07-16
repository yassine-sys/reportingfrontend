import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportassignComponent } from './reportassign.component';

describe('ReportassignComponent', () => {
  let component: ReportassignComponent;
  let fixture: ComponentFixture<ReportassignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportassignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

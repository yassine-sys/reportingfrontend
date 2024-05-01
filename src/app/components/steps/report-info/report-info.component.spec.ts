import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInfoComponent } from './report-info.component';

describe('ReportInfoComponent', () => {
  let component: ReportInfoComponent;
  let fixture: ComponentFixture<ReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

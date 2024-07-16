import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportinfoComponent } from './reportinfo.component';

describe('ReportinfoComponent', () => {
  let component: ReportinfoComponent;
  let fixture: ComponentFixture<ReportinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

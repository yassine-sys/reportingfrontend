import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprapportComponent } from './reprapport.component';

describe('ReprapportComponent', () => {
  let component: ReprapportComponent;
  let fixture: ComponentFixture<ReprapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReprapportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReprapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

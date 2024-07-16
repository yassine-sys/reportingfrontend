import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCustomiseComponent } from './generate-customise.component';

describe('GenerateCustomiseComponent', () => {
  let component: GenerateCustomiseComponent;
  let fixture: ComponentFixture<GenerateCustomiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateCustomiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateCustomiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

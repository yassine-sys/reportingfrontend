import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreOperationComponent } from './filtre-operation.component';

describe('FiltreOperationComponent', () => {
  let component: FiltreOperationComponent;
  let fixture: ComponentFixture<FiltreOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltreOperationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltreOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

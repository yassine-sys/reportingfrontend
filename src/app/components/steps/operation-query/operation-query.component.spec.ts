import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationQueryComponent } from './operation-query.component';

describe('OperationQueryComponent', () => {
  let component: OperationQueryComponent;
  let fixture: ComponentFixture<OperationQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

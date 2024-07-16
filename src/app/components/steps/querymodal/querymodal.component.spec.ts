import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerymodalComponent } from './querymodal.component';

describe('QuerymodalComponent', () => {
  let component: QuerymodalComponent;
  let fixture: ComponentFixture<QuerymodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuerymodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuerymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

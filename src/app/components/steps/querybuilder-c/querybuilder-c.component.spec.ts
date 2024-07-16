import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerybuilderCComponent } from './querybuilder-c.component';

describe('QuerybuilderCComponent', () => {
  let component: QuerybuilderCComponent;
  let fixture: ComponentFixture<QuerybuilderCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuerybuilderCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuerybuilderCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

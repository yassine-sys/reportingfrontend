import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdetailledreportsComponent } from './listdetailledreports.component';

describe('ListdetailledreportsComponent', () => {
  let component: ListdetailledreportsComponent;
  let fixture: ComponentFixture<ListdetailledreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListdetailledreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListdetailledreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

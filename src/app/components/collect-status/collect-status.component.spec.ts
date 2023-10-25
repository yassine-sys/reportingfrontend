import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectStatusComponent } from './collect-status.component';

describe('CollectStatusComponent', () => {
  let component: CollectStatusComponent;
  let fixture: ComponentFixture<CollectStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

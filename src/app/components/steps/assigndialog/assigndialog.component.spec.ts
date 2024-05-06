import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigndialogComponent } from './assigndialog.component';

describe('AssigndialogComponent', () => {
  let component: AssigndialogComponent;
  let fixture: ComponentFixture<AssigndialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigndialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssigndialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

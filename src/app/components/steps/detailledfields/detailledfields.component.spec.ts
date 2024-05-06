import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailledfieldsComponent } from './detailledfields.component';

describe('DetailledfieldsComponent', () => {
  let component: DetailledfieldsComponent;
  let fixture: ComponentFixture<DetailledfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailledfieldsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailledfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

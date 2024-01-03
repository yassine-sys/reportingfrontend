import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistdashboardComponent } from './playlistdashboard.component';

describe('PlaylistdashboardComponent', () => {
  let component: PlaylistdashboardComponent;
  let fixture: ComponentFixture<PlaylistdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

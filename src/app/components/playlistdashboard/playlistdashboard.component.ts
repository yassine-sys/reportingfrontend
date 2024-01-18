import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { FunctionService } from 'src/app/services/function.service';

@Component({
  selector: 'app-playlistdashboard',
  templateUrl: './playlistdashboard.component.html',
  styleUrls: ['./playlistdashboard.component.css'],
})
export class PlaylistdashboardComponent implements OnInit, AfterViewInit {
  playListId: any;
  playList: any;
  playLists: any;
  draggedReport: any;
  draggedReportIndex!: number;
  showCreateInput: boolean = false;
  newPlaylistName: string = '';
  darkModeEnabled!: boolean;
  private subscriptionDarkMode: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FunctionService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.loadPlayLists();
  }

  ngAfterViewInit(): void {
    this.subscriptionDarkMode = this.darkModeService.darkModeState.subscribe(
      (isDarkMode) => {
        this.darkModeEnabled = isDarkMode;
        //this.applyChartTheme();
        //this.updateAllCharts();
        //this.ngOnInit();
      }
    );
  }

  dragStart(event: any, pl: any, report: any, index: number): void {
    this.draggedReport = report;
    this.draggedReportIndex = index;
  }

  dragEnd(pl: any, event: any): void {
    this.draggedReport = null;
  }

  onDrop(pl: any, event: any): void {
    // Extract the report that was moved
    const movedReport = pl.playlistReports.splice(
      this.draggedReportIndex,
      1
    )[0];

    // Insert the moved report at its new position
    pl.playlistReports.splice(event.currentIndex, 0, movedReport);

    // Get the ordered report IDs after rearrangement
    let orderedReportIds = this.getOrderedReportIds(pl);

    // Update the order on the backend
    this.service.updateReportOrder(pl.id, orderedReportIds).subscribe(
      (response) => {
        console.log('Order update response:', response);
      },
      (error) => {
        // Handle error, possibly reverting the local changes if the update fails
      }
    );
  }

  loadPlayLists() {
    this.service.getAllPlayLists().subscribe((resp) => {
      this.playLists = resp;
    });
  }

  private getOrderedReportIds(pl: any): number[] {
    console.log('Playlist Reports: ', pl.playlistReports);
    return pl.playlistReports.map(
      (playlistReport: { report: { id: any } }) => playlistReport.report.id
    );
  }

  detacheReport(playlistId: any, reportId: any) {
    this.service
      .detachReportFromPlayList(playlistId, reportId)
      .subscribe((resp) => {
        console.log(resp);
        this.loadPlayLists();
      });
  }

  deletePlayList(playlistId: any) {
    this.service.deletePlayList(playlistId).subscribe((resp) => {
      this.loadPlayLists();
    });
  }

  showCreateNewPlaylist() {
    this.showCreateInput = true; // Show the input field and confirm button
    console.log(this.showCreateInput);
  }

  saveNewPlaylist() {
    if (this.newPlaylistName.trim().length === 0) {
      return;
    }

    const playlistData = {
      playListName: this.newPlaylistName,
    };

    this.service.createPlayList(playlistData).subscribe(
      (response) => {
        console.log('Response:', response);
        this.loadPlayLists();
        this.showCreateInput = false;
      },
      (error) => {
        console.error('Error creating playlist:', error);
      }
    );
  }

  cancel() {
    this.showCreateInput = false;
  }
}

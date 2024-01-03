import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FunctionService } from 'src/app/services/function.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
})
export class PlaylistComponent implements OnInit {
  @Input() id: any;
  playlists: any;
  selectedValues: any[] = [];
  showCreateInput: boolean = false;
  newPlaylistName: string = '';

  initialSelectedPlaylists: any[] = [];

  constructor(
    private service: FunctionService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.loadPlayLists();
  }

  loadPlayLists() {
    this.service.getAllPlayLists().subscribe((response) => {
      this.playlists = response;
      this.setSelectedPlaylists();
    });
  }

  setSelectedPlaylists() {
    const reportId = this.config.data.id;
    this.initialSelectedPlaylists = this.playlists
      .filter((playlist: { playlistReports: any[] }) =>
        playlist.playlistReports.some(
          (playlistReport) => playlistReport.report.id === reportId
        )
      )
      .map((playlist: { id: any }) => playlist.id);
    this.selectedValues = [...this.initialSelectedPlaylists]; // Copy initial selections
  }

  onCheckboxChange() {
    const reportId = this.config.data.id;

    // Determine playlists to attach (newly checked)
    const playlistsToAttach = this.selectedValues.filter(
      (id) => !this.initialSelectedPlaylists.includes(id)
    );

    // Determine playlists to detach (previously checked but now unchecked)
    const playlistsToDetach = this.initialSelectedPlaylists.filter(
      (id) => !this.selectedValues.includes(id)
    );

    // Call API to attach reports to newly checked playlists
    if (playlistsToAttach.length > 0) {
      const attachRequest = {
        reportId: reportId,
        playlistIds: playlistsToAttach,
      };

      this.service.assignReportsToPlaylists(attachRequest).subscribe(
        (response) => console.log('Attached report to playlists:', response),
        (error) => console.error('Error attaching report to playlists:', error)
      );
    }

    // Call API to detach reports from unchecked playlists
    playlistsToDetach.forEach((playlistId) => {
      this.service.detachReportFromPlayList(playlistId, reportId).subscribe(
        (response) => console.log('Detached report from playlist:', response),
        (error) => console.error('Error detaching report from playlist:', error)
      );
    });

    // Update initialSelectedPlaylists to reflect the new state
    this.initialSelectedPlaylists = this.selectedValues.slice();
  }

  showCreateNewPlaylist() {
    this.showCreateInput = true; // Show the input field and confirm button
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
        // Reload playlists, hide input field, etc.
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

  submit() {
    // Ensure that playlists are selected
    if (this.selectedValues.length === 0) {
      // Optionally, show an error message to the user
      console.error('No playlists selected');
      return;
    }

    const request = {
      reportId: this.config.data.id,
      playlistIds: this.selectedValues,
    };

    this.service.assignReportsToPlaylists(request).subscribe(
      (response) => {
        this.ref.close(); // Close the dialog if needed
      },
      (error) => {
        console.error('Error assigning reports to playlists:', error);
        // Handle errors here
      }
    );
  }
}

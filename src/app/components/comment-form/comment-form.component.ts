import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChartService } from 'src/app/services/chart.service';
import { lcrComment } from 'src/model/lcrComment';
import { FunctionChartsComponent } from '../function-charts/function-charts.component';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  comment: string = '';
  lcroperator: string = '';
  destinationName: string = '';
  @ViewChild(FunctionChartsComponent) func!: FunctionChartsComponent;
  @Output() commentAdded = new EventEmitter<void>(); // Define the event

  constructor(
    public dialogRef: MatDialogRef<CommentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chartService: ChartService,
    private commentService: CommentService
  ) {
    console.log(data);
  }
  ngOnInit(): void {
    this.lcroperator = this.data.data.LCR_Carrier;
    this.destinationName = this.data.data.Destination_name;
  }

  addClicked(): void {
    const lcrComment: lcrComment = {
      lcroperator: this.lcroperator,
      destinationoperator: this.destinationName,
      comment: this.comment,
    };

    this.chartService.addComment(lcrComment).subscribe((response) => {
      console.log('Comment added:', response);
      //this.commentAdded.emit(); // Emit the event
      this.commentService.emitCommentAdded();

      this.dialogRef.close(this.comment);
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}

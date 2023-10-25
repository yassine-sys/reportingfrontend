import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentAddedSource = new Subject<void>();

  commentAdded$ = this.commentAddedSource.asObservable();

  emitCommentAdded() {
    this.commentAddedSource.next();
  }
}

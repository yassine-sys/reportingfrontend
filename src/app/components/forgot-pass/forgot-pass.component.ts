import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../model/User'; // Import the User model if not already imported
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent {
  username: string = ''; // Make sure it's initialized as an empty string
  showMessage: boolean = false;
  errorMessage: string = '';
  displayedEmail: any;

  constructor(private userService: UserService) {}

  submitForm() {
    // Check if the input is empty
    if (!this.username) {
      this.errorMessage = 'Please enter an email or username.';
      return;
    }

    // Check if the input is an email or username using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailPattern.test(this.username);

    if (isEmail) {
      this.findByEmailAndReset();
    } else {
      this.findByUsernameAndReset();
    }
  }

  findByEmailAndReset() {
    this.userService
      .getUserByEmail(this.username)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Email not found.';
          return throwError(error);
        })
      )
      .subscribe((user: User) => {
        this.displayedEmail = user.uMail;
        this.resetPass({ email: this.username });
      });
  }

  findByUsernameAndReset() {
    this.userService
      .getUserByUsername(this.username)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Username not found.';
          return throwError(error);
        })
      )
      .subscribe((user: User) => {
        this.displayedEmail = user.uMail;
        this.resetPass({ username: this.username });
      });
  }

  resetPass(data: any) {
    this.userService
      .resetPassword(data)
      .pipe(
        catchError((error) => {
          if (error.status === 200) {
            // If status is 200, it's a success, so don't treat it as an error
            this.showMessage = true;
          } else {
            this.errorMessage = 'Check Username or Email.';
          }
          return throwError(error);
        })
      )
      .subscribe();
  }
}

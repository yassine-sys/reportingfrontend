import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../model/User'; // Import the User model if not already imported
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent implements OnInit {
  username: string = ''; // Make sure it's initialized as an empty string
  showMessage: boolean = false;
  errorMessage: string = '';
  displayedEmail: any;

  captchaSrc!: string;
  captchaKey!: string;
  captchaInput: string = '';

  captchaImageUrl: SafeUrl | null = null;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadCaptcha();
  }

  submitForm() {
    // Check if the input is empty
    if (!this.username) {
      this.errorMessage = 'Please enter an email or username.';
      return;
    }

    // Check if the CAPTCHA input is filled
    if (!this.captchaInput) {
      this.errorMessage = 'Please verify you are not a robot.';
      return;
    }

    // Check if the input is an email or username using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailPattern.test(this.username);

    // Validate the CAPTCHA first
    this.userService
      .validateCaptcha(this.captchaKey, this.captchaInput)
      .subscribe(
        () => {
          console.log('Captcha validation success');
          // Proceed with email or username reset logic upon CAPTCHA validation success
          if (isEmail) {
            this.resetPass({ email: this.username });
          } else {
            this.resetPass({ username: this.username });
          }
        },
        (error) => {
          console.error('Captcha validation failed', error);
          this.errorMessage = 'CAPTCHA validation failed. Please try again.';
          this.loadCaptcha();
        }
      );
  }

  resetPass(data: any) {
    this.userService
      .resetPassword(data)
      .pipe(
        catchError((error) => {
          if (error.status === 200) {
            this.showMessage = true;
          } else {
            this.errorMessage = 'Check Username or Email.';
          }
          return throwError(error);
        })
      )
      .subscribe();
  }

  loadCaptcha() {
    this.userService.loadCaptcha().subscribe(
      (data) => {
        this.captchaImageUrl = data.captchaImageSrc;
        this.captchaKey = data.captchaKey;
      },
      (error) => {
        console.error('Failed to load CAPTCHA', error);
      }
    );
  }

  validateCaptcha() {
    this.userService
      .validateCaptcha(this.captchaKey, this.captchaInput)
      .subscribe(
        () => {
          console.log('Captcha validation success');
        },
        (error) => {
          console.error('Captcha validation failed', error);
          this.loadCaptcha();
        }
      );
  }
}

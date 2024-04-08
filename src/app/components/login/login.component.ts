import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { User } from 'src/model/User';
import { Login } from 'src/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  infos!: Login;
  user!: User;
  invalidLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private navService: NavService
  ) {}

  ngOnInit() {
    this.user = {
      uId: 0,
      username: '',
      dateCreation: new Date(),
      dateModif: new Date(NaN),
      etat: '',
      idCreateur: 0,
      nomUtilisateur: '',
      uDepart: '',
      uLogin: '',
      uMail: '',
      uMatricule: '',
      password: '',
      user_group: null,
      role: null,
    };
    // Redirect to dashboard if already logged in
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.user.username === '' || this.user.password === '') {
      this.toastr.error('Please fill in both username and password fields.');
      return;
    }
    this.authService.generateToken2(this.user).subscribe(
      (resp: any) => {
        if (this.cookieService.get('jwtToken')) {
          this.cookieService.set(
            'jwtToken',
            this.cookieService.get('jwtToken')
          );
          this.toastr.success('Success.');
          this.navService.fetchModulesAndFunctions();
          this.router.navigate(['/dashboard']);
          //this.reloadPage()
        }
      },
      (error) => {
        this.invalidLogin = true;
        this.toastr.error('Invalid username or password.');
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}

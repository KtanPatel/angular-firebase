import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  navigation: any[] = [];
  isSecure: boolean;
  publicNav = [
    {
      title: 'Login',
      url: '/login',
    }
  ];
  privateNav = [
    {
      title: 'Home',
      url: '/home'
    }
  ];
  constructor(
    private themeService: ThemeService,
    private fire: FirebaseService,
    private router: Router) { }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.fire.isAuth().subscribe(user => {
      this.isSecure = !!user;
      this.navigation = this.isSecure ? this.privateNav : this.publicNav;
    });
  }

  logout = () => {
    this.fire.doLogout().then(res => {
      this.router.navigate(['']);
    }).catch(err => {
      console.log('err => ', err);
    });
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}

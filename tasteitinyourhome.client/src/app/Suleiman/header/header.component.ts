import { Component, OnInit } from '@angular/core';
import { SondosComponent } from '../../Sondos/sondos/sondos.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userId: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.userId = sessionStorage.getItem('userId');
    this.isLoggedIn = !!this.userId;
  }

  logout() {
    sessionStorage.removeItem('userId');
    this.userId = null;
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Espace Client';
  pages: any[] = [
    { title: 'Dashboard', url: '/client-desh', icon: 'home' },
    { title: 'Users', url: '/user', icon: 'person' },
    { title: 'Sociéte', url: '/societe', icon: 'business' },
    { title: 'Contact(Client)', url: '/contact', icon: 'person' },
    { title: 'Projet', url: '/projet', icon: 'reader' },
    { title: 'Sign Out', url: '/logout', icon: 'log-out', route: true },
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}

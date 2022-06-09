import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const BACKEND_URL = 'http://localhost:3000/api/users';
interface AuthData {
  nom?: string;
  prenom?: string;
  fonction?: string;
  dateInscreption?: Date;
  adress?: string;
  telephone?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private _authStatusListener = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  get token() {
    return this._token;
  }

  get authStatusListener() {
    return this._authStatusListener.asObservable();
  }

  get isAuth() {
    return this.isAuthenticated;
  }

  createUser(
    nom: string,
    prenom: string,
    fonction: string,
    dateInscreption: Date,
    adress: string,
    telephone: string,
    email: string
  ) {
    console.log('in the server');
    const authData: AuthData = {
      nom: nom,
      prenom: prenom,
      fonction: fonction,
      dateInscreption: dateInscreption,
      adress: adress,
      telephone: telephone,
      email: email,
    };

    return this.http.post<{ message: string }>(
      `${BACKEND_URL}/signup`,
      authData
    );
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    // const isInFuture = authInfo.expirationDate > now;
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this._token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this._authStatusListener.next(true);
    }
  }

  logout() {
    this._token = null;
    this.isAuthenticated = false;
    this._authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigateByUrl('login');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}


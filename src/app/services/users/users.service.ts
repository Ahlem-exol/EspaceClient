import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

const BACKEND_URL = 'http://localhost:3000/api/users';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<{ message: string; users: User[] }>(BACKEND_URL);
  }

  updateUser(updateUser: User) {
    return this.http.put<{ message: string }>(
      BACKEND_URL + '/update/' + updateUser,
      updateUser
    );
  }
  DeleteUser(idUser: number) {
    console.log('id user ', idUser);
    return this.http.delete<{ message: string }>(BACKEND_URL + '/' + idUser);
  }
}

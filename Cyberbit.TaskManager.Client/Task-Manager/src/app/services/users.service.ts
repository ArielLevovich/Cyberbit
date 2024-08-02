import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  prefix(): string {
    return `Users/`;
  }

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.gw}${this.prefix()}`).pipe(
      catchError(_ => of([] as User[]))
    )
  }

  public getUser(id: number): Observable<User | null> {
    return this.http.get<User>(`${environment.gw}${this.prefix()}${id}`).pipe(
      catchError(_ => of(null))
    )
  }
}


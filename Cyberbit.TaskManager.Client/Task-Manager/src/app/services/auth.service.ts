import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../model/authResponse';
import { UserDetails } from '../model/userDetails';
import { JwtUtils } from './jwt.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  prefix(): string {
    return `Users/`;
  }
  private readonly tokenKeyName = 'accssToken';
  private _loginBS = new BehaviorSubject<boolean | null>(false);
  public login$ = this._loginBS.asObservable();

  private _userDetailsBS = new BehaviorSubject<UserDetails | null>(null);
  public userDetails$ = this._userDetailsBS.asObservable();

  constructor(private http: HttpClient, userService: UsersService) {
    const token = this.getToken();
    if (token) {
      const jwtUtils = new JwtUtils();
      const userId = jwtUtils.getPropertyFromToken("id", token);
      if (!isNaN(+userId)) {
        userService.getUser(+userId).pipe(filter(user => !!user)).subscribe(user => {
          this._userDetailsBS.next(user as UserDetails);
          this._loginBS.next(true);
        })
      }
    } else {
      this._loginBS.next(false);
    }
  }


  public logout() {
    this._loginBS.next(false);
    this._userDetailsBS.next(null);
    localStorage.removeItem(this.tokenKeyName);
  }

  public login(username: string, password: string): Observable<UserDetails> {
    if (this._loginBS.getValue()) {
      return of(this._userDetailsBS.getValue() as UserDetails);
    }
    return this.http.post<AuthResponse>(`${environment.gw}${this.prefix()}Login`, { username, password }).pipe(
      catchError(_ => of(null as unknown as AuthResponse)),
      tap((response: AuthResponse) => {
        if (!!response) {
          localStorage.setItem('accssToken', response.token);
          this._userDetailsBS.next(response as UserDetails);
        }
        this._loginBS.next(!!response);
      })
    )
  }

  public getToken() {
    return localStorage.getItem('accssToken');
  }
}


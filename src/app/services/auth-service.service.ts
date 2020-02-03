import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  public login(phone: any) {
    return this.http
      .post<any>(`${environment.bffUrl}/loginUser`, phone, this.httpOptions)
      .pipe(
        map(user => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  public register(userInfo: any) {
    return this.http
    .post<any>(`${environment.bffUrl}/register`, userInfo, this.httpOptions)
    .pipe(
      map(user => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  public logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/auth"]);
  }
}

import { Router } from '@angular/router';
import { BaseService } from './../shared/base.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoginModel, RegisterModel, UserLoginModel } from '../shared/models';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSubject: BehaviorSubject<UserLoginModel>;
 
  constructor(private baseService:BaseService,private router:Router){
    this.currentUserSubject = new BehaviorSubject<UserLoginModel>(JSON.parse(localStorage.getItem('currentUser')));
  }
  public get currentUser(){
    return this.currentUserSubject;
  }
  login(loginModel:LoginModel){
    return this.baseService.post<UserLoginModel>("Account/Login", loginModel)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  signup(registerModel:RegisterModel) {
    return this.baseService.post<RegisterModel>("Account/Register", registerModel);
  }
}

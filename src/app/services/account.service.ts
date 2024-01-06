import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from '../models/userdto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private backendurl = "http://localhost:5075/api/"
  constructor(private httpClient : HttpClient) {
    this.httpClient = httpClient;
   }

  public logIn(user : UserDto) : Observable<any> {
    return this.httpClient.post(this.backendurl+"account/login",user);
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlApi = 'http://localhost:3000';
  constructor() {}

  login(email: string, password: string) {
    
  }
}

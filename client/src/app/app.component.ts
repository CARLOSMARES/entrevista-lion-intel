import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';

  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.email, this.password);
  }
}

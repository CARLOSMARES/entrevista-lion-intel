import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';

  email: string = '';
  password: string = '';
  rol: string = '';
  token: string = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (data) => {
        this.rol = data.user.rol;
        this.token = data.token;
        localStorage.setItem('token', this.token);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

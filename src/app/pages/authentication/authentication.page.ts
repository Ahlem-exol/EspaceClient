import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class AuthenticationPage implements OnInit {
  validation_messages = {
    titre: [
      { type: 'required', message: 'Le titre is required.' },
      {
        type: 'minlength',
        message: 'Titre must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: 'Titre cannot be more than 255 characters long.',
      },
    ],
    req: [{ type: 'required', message: 'this champs is required.' }],
  };

  email: string;
  password: string;
  LoginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private menu: MenuController
  ) {
    this.menu.enable(false, 'custom-menu');
  }
  isLoading = false;

  ngOnInit() {
    this.LoginForm = new FormGroup({
      //i put all the input and there form validateur
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(800),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(800),
      ]),
    });
  }

  login() {
    this.isLoading = true;
    const email = this.email;
    const password = this.password;
    this.authService.login(email, password).subscribe(
      (result) => {
        console.log(result);
        this.isLoading = !this.isLoading;
      },
      (error) => {
        console.log(error.error.message);
        this.isLoading = !this.isLoading;
      }
    );
  }
}

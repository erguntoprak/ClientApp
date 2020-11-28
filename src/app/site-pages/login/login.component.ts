import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'se-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: LoginModel;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService) { }

  ngOnInit() {
    this.acdcLoadingService.hideLoading();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onLoginSubmit() {
    this.acdcLoadingService.showLoading();
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.loginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.authService.login(this.loginModel).subscribe(
      data => {
        this.router.navigate(['/panel']);
        this.toastr.success('Giriş işlemi yapıldı.', 'Başarılı!');
        this.acdcLoadingService.hideLoading();
      }
    );
  }
}

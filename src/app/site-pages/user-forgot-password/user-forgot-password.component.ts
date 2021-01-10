import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-user-forgot-password',
  templateUrl: './user-forgot-password.component.html'
})
export class UserForgotPasswordComponent implements OnInit {

  userForgotPasswordForm: FormGroup;
  submitted = false;
  userForgotPasswordFormSuccessMessage = false;
  userForgotPasswordFormDiv = true;
  errorList: string[] = [];


  constructor(private baseService: BaseService, private formBuilder: FormBuilder, 
    private acdcLoadingService: AcdcLoadingService, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateTitle("Şifremi Unuttum - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/sifreyi-unuttum');
    this.seoService.updateMeta('robots','index, follow');

    this.userForgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  userForgotPasswordFormSubmit() {
    this.acdcLoadingService.showLoading();
    this.submitted = true;
    if (this.userForgotPasswordForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.baseService.post("Account/ForgotPassword", this.userForgotPasswordForm.get('email').value).subscribe(data => {
      this.errorList = [];
      this.userForgotPasswordFormSuccessMessage = true;
      this.userForgotPasswordFormDiv = false;
      this.acdcLoadingService.hideLoading();
    }
    );

  }
}

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
    this.seoService.updateMeta('robots','noindex, follow');

    this.seoService.updateMeta('description', "İzmir Eğitim Kurumları - Şifremi Unuttum");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','Şifremi Unuttum - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl + '/sifreyi-unuttum');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir Eğitim Kurumları - Şifremi Unuttum");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Şifremi Unuttum - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir Eğitim Kurumları - Şifremi Unuttum");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl + '/sifreyi-unuttum');

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

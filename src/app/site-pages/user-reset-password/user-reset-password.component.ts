import { Component, OnInit, NgZone } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-user-reset-password',
  templateUrl: './user-reset-password.component.html'
})
export class UserResetPasswordComponent implements OnInit {

  userResetPasswordForm: FormGroup;
  submitted = false;
  userResetPasswordFormSuccessMessage = false;
  userResetPasswordFormDiv = true;
  errorList: string[] = [];


  constructor(private baseService: BaseService, private formBuilder: FormBuilder, 
    private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private router: Router, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateTitle("Şifremi Sıfırla - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/sifre-sifirla');
    this.seoService.updateMeta('robots','noindex, follow');

    this.seoService.updateMeta('description', "İzmir Eğitim Kurumları - Şifremi Sıfırla");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','Şifremi Sıfırla - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl + '/sifre-sifirla');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir Eğitim Kurumları - Şifremi Sıfırla");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Şifremi Sıfırla - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir Eğitim Kurumları - Şifremi Sıfırla");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl + '/sifre-sifirla');

    this.userResetPasswordForm = this.formBuilder.group({
      userId: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      token:[null,Validators.required]
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      }
    );
    this.route.queryParams.subscribe(params => {
      let userId = params['userId'];
      let token = params['confirmation-token'];
      this.userResetPasswordForm.get('userId').setValue(userId);
      this.userResetPasswordForm.get('token').setValue(token);
    });
  }
  userResetPasswordFormSubmit() {
    this.acdcLoadingService.showLoading();
    this.submitted = true;
    this.errorList = [];
    if (this.userResetPasswordForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.baseService.post("Account/ResetPassword", this.userResetPasswordForm.value).subscribe(data => {
      this.userResetPasswordFormSuccessMessage = true;
      this.userResetPasswordFormDiv = false;
      this.acdcLoadingService.hideLoading();
      setTimeout(() => {
        this.router.navigate(['/giris-yap']);
      }, 5000);
    }
    );

  }
}

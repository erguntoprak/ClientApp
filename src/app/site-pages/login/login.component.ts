import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'se-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: LoginModel;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, 
    private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService, private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateTitle("Giriş Yap - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/giris-yap');
    this.seoService.updateMeta('robots','index, follow');
    this.seoService.updateMeta('description', "Giriş yaparak İzmir Eğitim Kurumları'nın büyük ayrıcalıklarından faydalanmaya başlayın");

     //Facebook Meta Tag
     this.seoService.updateMeta('og:title', 'Giriş Yap - İzmir Eğitim Kurumları');
     this.seoService.updateMeta('og:type', 'website');
     this.seoService.updateMeta('og:url', environment.baseUrl + '/giris-yap');
     this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
     this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
     this.seoService.updateMeta('og:description', "Giriş yaparak İzmir Eğitim Kurumları'nın büyük ayrıcalıklarından faydalanmaya başlayın");
     this.seoService.updateMeta('og:locale', 'tr_TR');
     this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
 
     //Twitter Meta Tag
     this.seoService.updateMeta('twitter:title', 'Giriş Yap - İzmir Eğitim Kurumları');
     this.seoService.updateMeta('twitter:description', "Giriş yaparak İzmir Eğitim Kurumları'nın büyük ayrıcalıklarından faydalanmaya başlayın");
     this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
     this.seoService.updateMeta('twitter:card', 'summary_large_image');
     this.seoService.updateMeta('twitter:url', environment.baseUrl + '/giris-yap');

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

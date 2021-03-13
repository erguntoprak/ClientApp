import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../shared/models';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { AcdcLoadingService } from 'acdc-loading';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'se-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorList = [];
  registerModel: RegisterModel;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, 
    private toastr: ToastrService, private acdcLoadingService: AcdcLoadingService, private seoService: SeoService) { }

  ngOnInit() {
    this.seoService.updateTitle("Kayıt Ol - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/kayit-ol');
    this.seoService.updateMeta('robots','index, follow');

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title', 'Kayıt Ol - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type', 'website');
    this.seoService.updateMeta('og:url', environment.baseUrl + '/kayit-ol');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "Kayıt olarak İzmir Eğitim Kurumları'nın büyük ayrıcalıklarından faydalanmaya başlayın");
    this.seoService.updateMeta('og:locale', 'tr_TR');
    this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'Kayıt Ol - İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description', "Kayıt olarak İzmir Eğitim Kurumları'nın büyük ayrıcalıklarından faydalanmaya başlayın");
    this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card', 'summary_large_image');
    this.seoService.updateMeta('twitter:url', environment.baseUrl + '/kayit-ol');

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmationCheck: ['',Validators.requiredTrue]
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      });
  }

  onRegisterSubmit() {
    this.acdcLoadingService.showLoading();
    this.submitted = true;
    this.errorList = [];
    if (this.registerForm.invalid) {
      this.acdcLoadingService.hideLoading();
      return;
    }
    this.registerModel = {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      password: this.registerForm.value.password
    }
    this.authService.signup(this.registerModel).subscribe(responseModel => {
      this.router.navigate(['/giris-yap']);
      this.toastr.success('Kayıt olma işlemi yapıldı. E-posta onayı yapıldıktan sonra sizinle iletişime geçilecektir.', 'Başarılı!');
      this.acdcLoadingService.hideLoading();
    });

  }
}

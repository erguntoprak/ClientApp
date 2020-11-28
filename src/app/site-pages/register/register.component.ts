import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../shared/models';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { AcdcLoadingService } from 'acdc-loading';




@Component({
  selector: 'se-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorList = [];
  registerModel: RegisterModel;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private acdcLoadingService: AcdcLoadingService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
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
      this.router.navigate(['/giris']);
      this.toastr.success('Kayıt olma işlemi yapıldı. E-posta onayı yapıldıktan sonra sizinle iletişime geçilecektir.', 'Başarılı!');
      this.acdcLoadingService.hideLoading();
    });

  }
}

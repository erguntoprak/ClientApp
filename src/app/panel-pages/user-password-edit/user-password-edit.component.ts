import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validator';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';


@Component({
  selector: 'se-user-password-edit',
  templateUrl: './user-password-edit.component.html'
})
export class UserPasswordEditComponent implements OnInit {

  passwordUpdateForm: FormGroup;
  errorList = [];
  matcher = new MyErrorStateMatcher();


  constructor(private formBuilder: FormBuilder,private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {

    this.passwordUpdateForm = this.formBuilder.group({
      userId: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]]
    },
      {
        validators: MustMatch('password', 'confirmPassword')
      }
    );
    this.route.params.subscribe(params => {
      let userId = params['userId'];
      this.passwordUpdateForm.get('userId').setValue(userId);
    });
  }

  onSubmit() {
    this.acdcLoadingService.showLoading();
    this.baseService.post("Account/UpdateUserPassword",
      this.passwordUpdateForm.value).subscribe(data => {
        this.toastr.success('Şifre değiştirme işlemi gerçekleşti.', 'Başarılı!');
        this.router.navigate(['/panel/kullanici-listesi']);
        this.acdcLoadingService.hideLoading();
      });
  }
}


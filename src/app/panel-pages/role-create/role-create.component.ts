import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SeoService } from 'src/app/_services/seo.service';


@Component({
  selector: 'se-role-create',
  templateUrl: './role-create.component.html'
})
export class RoleCreateComponent implements OnInit {

  roleName: string;
  matcher = new MyErrorStateMatcher();
  roleInsertForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService,
     private toastr: ToastrService, private router: Router, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'noindex, nofollow');
    this.seoService.updateTitle("Panel - İzmir Eğitim Kurumları");
    this.roleInsertForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  onSubmit() {
    this.baseService.post("Account/AddRole",
    this.roleInsertForm.get('name').value).subscribe(data => {
        this.toastr.success('Role oluşturuldu.', 'Başarılı!');
        this.router.navigate(['/panel/role-listesi']);
      });
  }
}


import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { CategoryModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'se-attribute-category-edit',
  templateUrl: './attribute-category-edit.component.html'
})
export class AttributeCategoryEditComponent implements OnInit {

  attributeCategoryName: string;
  matcher = new MyErrorStateMatcher();
  attributeCategoryUpdateForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.attributeCategoryUpdateForm = this.formBuilder.group({
      id: [null,Validators.required],
      name: [null, Validators.required]
    });
    this.route.params.subscribe(params => {
      let attributeCategoryId = params['attributeCategoryId'];
      this.attributeCategoryUpdateForm.get('id').setValue(attributeCategoryId);
      this.baseService.get<CategoryModel>("AttributeCategory/GetAttributeCategoryById?attributeCategoryId=", attributeCategoryId).subscribe(attributeCategoryModel => {
        this.attributeCategoryUpdateForm.patchValue(attributeCategoryModel);
        this.acdcLoadingService.hideLoading();
      });
    });
  }

  onSubmit() {
    this.baseService.post("AttributeCategory/UpdateAttributeCategory",
      this.attributeCategoryUpdateForm.value).subscribe(data => {
        this.toastr.success('Özellik Kategori Güncellendi.', 'Başarılı!');
        this.router.navigate(['/panel/ozellik-kategori-listesi']);
      });
  }
}


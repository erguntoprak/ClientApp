import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { CategoryModel, AttributeCategoryModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'se-attribute-edit',
  templateUrl: './attribute-edit.component.html'
})
export class AttributeEditComponent implements OnInit {

  attributeCategoryName: string;
  matcher = new MyErrorStateMatcher();
  attributeUpdateForm: FormGroup;
  attributeCategoryList: AttributeCategoryModel[];
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.attributeUpdateForm = this.formBuilder.group({
      id: [null,Validators.required],
      name: [null, Validators.required],
      attributeCategoryId: [null, Validators.required]
    });
    this.route.params.subscribe(params => {
      let attributeId = params['attributeId'];
      this.attributeUpdateForm.get('id').setValue(attributeId);
      this.baseService.get<CategoryModel>("Attribute/GetAttributeById?attributeId=", attributeId).subscribe(attributeModel => {
        this.baseService.getAll<AttributeCategoryModel[]>("AttributeCategory/GetAllAttributeCategoryList").subscribe(attributeCategoryList => {
          this.attributeCategoryList = attributeCategoryList;
          this.attributeUpdateForm.patchValue(attributeModel);
          this.acdcLoadingService.hideLoading();
        });
      });
    });
  }
  onSubmit() {
    this.baseService.post("Attribute/UpdateAttribute",
      this.attributeUpdateForm.value).subscribe(data => {
        this.toastr.success('Özellik Güncellendi.', 'Başarılı!');
        this.router.navigate(['/panel/ozellik-listesi']);
      });
  }
}


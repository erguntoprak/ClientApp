import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AttributeCategoryModel } from '../../shared/models';


@Component({
  selector: 'se-attribute-create',
  templateUrl: './attribute-create.component.html'
})
export class AttributeCreateComponent implements OnInit {

  attributeCategoryName: string;
  matcher = new MyErrorStateMatcher();
  attributeInsertForm: FormGroup;
  attributeCategoryList: AttributeCategoryModel[];
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.attributeInsertForm = this.formBuilder.group({
      name: [null, Validators.required],
      attributeCategoryId:[null,Validators.required]
    });
    this.getAllAttributeCategoryList();
  }

  getAllAttributeCategoryList() {
    this.acdcLoadingService.showLoading();
    this.baseService.getAll<AttributeCategoryModel[]>("AttributeCategory/GetAllAttributeCategoryList").subscribe(attributeCategoryList => {
      this.attributeCategoryList = attributeCategoryList;
      this.acdcLoadingService.hideLoading();
    });
  }

  onSubmit() {
    this.baseService.post("Attribute/InsertAttribute",
      this.attributeInsertForm.value).subscribe(data => {
        this.toastr.success('Özellik oluşturuldu.', 'Başarılı!');
        this.router.navigate(['/panel/ozellik-listesi']);
      });
  }
}


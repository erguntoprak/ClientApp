import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { CategoryModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SeoService } from 'src/app/_services/seo.service';


@Component({
  selector: 'se-category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {

  categoryName: string;
  matcher = new MyErrorStateMatcher();
  categoryUpdateForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, 
    private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, 
    private toastr: ToastrService, private router: Router, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'noindex, nofollow');
    this.seoService.updateTitle("Panel - İzmir Eğitim Kurumları");
    this.categoryUpdateForm = this.formBuilder.group({
      id: [null,Validators.required],
      name: [null, Validators.required]
    });
    this.route.params.subscribe(params => {
      let categoryId = params['categoryId'];
      this.categoryUpdateForm.get('id').setValue(categoryId);
      this.baseService.get<CategoryModel>("Category/GetCategoryById?categoryId=", categoryId).subscribe(categoryModel => {
        this.categoryUpdateForm.patchValue(categoryModel);
        this.acdcLoadingService.hideLoading();
      });
    });
  }

  onSubmit() {
    this.baseService.post("Category/UpdateCategory",
      this.categoryUpdateForm.value).subscribe(data => {
        this.toastr.success('Kategori oluşturuldu.', 'Başarılı!');
        this.router.navigate(['/panel/kategori-listesi']);
      });
  }
}


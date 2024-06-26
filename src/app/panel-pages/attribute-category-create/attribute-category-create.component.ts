import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SeoService } from 'src/app/_services/seo.service';


@Component({
  selector: 'se-attribute-category-create',
  templateUrl: './attribute-category-create.component.html'
})
export class AttributeCategoryCreateComponent implements OnInit {

  attributeCategoryName: string;
  matcher = new MyErrorStateMatcher();
  attributeCategoryInsertForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService,
     private toastr: ToastrService, private router: Router, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateMeta('robots', 'noindex, nofollow');
    this.seoService.updateTitle("Panel - İzmir Eğitim Kurumları");
    this.attributeCategoryInsertForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  onSubmit() {
    this.baseService.post("AttributeCategory/InsertAttributeCategory",
      this.attributeCategoryInsertForm.value).subscribe(data => {
        this.toastr.success('Özellik Kategori oluşturuldu.', 'Başarılı!');
        this.router.navigate(['/panel/ozellik-kategori-listesi']);
      });
  }
}


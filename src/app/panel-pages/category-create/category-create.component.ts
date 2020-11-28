import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyErrorStateMatcher } from '../../_helpers/input-error-state-matcher';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'se-category-create',
  templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent implements OnInit {

  categoryName: string;
  matcher = new MyErrorStateMatcher();
  categoryInsertForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.categoryInsertForm = this.formBuilder.group({
      name: [null, Validators.required]
    });
  }

  onSubmit() {
    this.baseService.post("Category/InsertCategory",
      this.categoryInsertForm.value).subscribe(data => {
        this.toastr.success('Kategori oluşturuldu.', 'Başarılı!');
        this.router.navigate(['/panel/kategori-listesi']);
      });
  }
}


import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AttributeCategoryModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'se-category-attribute-category-create',
  templateUrl: './category-attribute-category-create.component.html',
  styleUrls: ['./category-attribute-category-create.component.scss']

})
export class CategoryAttributeCategoriCreateComponent implements OnInit {

  selectedAttributeCategoryModelList: AttributeCategoryModel[];
  otherAttributeCategoryModelList: AttributeCategoryModel[];

  categoryId;
  selectedAttributeCategoryId;
  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
    this.baseService.getAll<AttributeCategoryModel[]>("AttributeCategory/GetAllAttributeCategoryList").subscribe(attributeCategoryModelList => {
      this.baseService.get<number[]>("AttributeCategory/GetAttributeCategoryIdsByCategoryId?categoryId=", this.categoryId).subscribe(attributeCategoryIds => {
        this.selectedAttributeCategoryModelList = attributeCategoryModelList.filter(d => attributeCategoryIds.includes(d.id));
        this.otherAttributeCategoryModelList = attributeCategoryModelList.filter(d => !attributeCategoryIds.includes(d.id));
      });
      this.selectedAttributeCategoryId = attributeCategoryModelList[0].id;
      this.acdcLoadingService.hideLoading();
    });
  }

  addAttributeCategory() {
    this.baseService.post("AttributeCategory/InsertCategoryAttributeCategory",
      { categoryId: +this.categoryId, attributeCategoryList: this.selectedAttributeCategoryModelList }).subscribe(data => {
        this.toastr.success('Güncelleme işlemi gerçekleşti.', 'Başarılı!');
        this.router.navigate(['/panel/kategori-listesi']);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}


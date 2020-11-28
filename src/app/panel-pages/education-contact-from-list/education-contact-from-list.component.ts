import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { EducationContactFormListModel } from '../../shared/models';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'se-education-contact-from-list',
  templateUrl: './education-contact-from-list.component.html'
})
export class EducationContactFormListComponent implements OnInit {

  educationContactFormList: EducationContactFormListModel[] = [];

  constructor(private baseService: BaseService, private route: ActivatedRoute, private acdcLoadingService: AcdcLoadingService) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.baseService.get<EducationContactFormListModel[]>("Education/GetEducationContactFormListModelBySeoUrl?seoUrl=", params['name']).subscribe(educationContactFormList => {
        this.educationContactFormList = educationContactFormList;
      });
    });

  }
}

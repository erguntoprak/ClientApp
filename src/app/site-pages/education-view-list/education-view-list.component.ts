import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CategoryModel, DistrictModel, AddressModel, CategoryAttributeListModel, FilterModel, EducationListModel, EducationFilterListModel } from '../../shared/models';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var $: any;


@Component({
  selector: 'se-education-view-list',
  templateUrl: './education-view-list.component.html',
  styleUrls: ['./education-view-list.component.scss']
})
export class EducationViewListComponent implements OnInit, AfterViewInit {

  apiUrl = environment.apiUrl;
  @ViewChildren('filteredItems') filteredItems;
  categories: CategoryModel[] = [];
  districtList: DistrictModel[] = [];
  categoryAttributeList: CategoryAttributeListModel[] = [];
  filterModel: FilterModel;
  educationFilterList: EducationFilterListModel[] = [];
  educationFilterTempList: EducationFilterListModel[] = [];
  selectedCategoryIndex: number = null;
  selectedCategoryUrl: string;
  selectedDistrictUrls: string[] = [];
  selectedDistrictIds: number[] = [];
  selectedAttributeIds: number[] = [];
  selectedCategoryId: number;
  educationViewItemCount = 12;
  pageNumber: number = 1;

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.acdcLoadingService.showLoading();
    this.route.params.subscribe(params => {
      this.selectedCategoryUrl = params['category'];
    });
    this.route.queryParams.subscribe(params => {
      if (params['ilce']) {
        this.selectedDistrictUrls = params['ilce'].split(',');
      }
      if (params['ozellik']) {
        this.selectedAttributeIds = params['ozellik'].split(',').map(d => +d);
      }
    });
    this.getAllCallMethod();
  }
  ngAfterViewInit(): void {

    $(document).ready(function () {

      function sidebar_offcanvas() {
        const body = $('body');
        const sidebar = $('.sidebar');
        const offcanvas = sidebar.hasClass('sidebar--offcanvas--mobile') ? 'mobile' : 'always';
        const media = matchMedia('(max-width: 991px)');

        const open = function () {
          if (offcanvas === 'mobile' && !media.matches) {
            return;
          }

          const bodyWidth = body.width();
          body.css('overflow', 'hidden');
          body.css('paddingRight', (body.width() - bodyWidth) + 'px');

          sidebar.addClass('sidebar--open');
        };
        const close = function () {
          body.css('overflow', 'auto');
          body.css('paddingRight', '');

          sidebar.removeClass('sidebar--open');
        };
        const onMediaChange = function () {
          if (offcanvas === 'mobile') {
            if (!media.matches && sidebar.hasClass('sidebar--open')) {
              close();
            }
          }
        };

        if (media.addEventListener) {
          media.addEventListener('change', onMediaChange);
        } else {
          media.addListener(onMediaChange);
        }

        $('.filters-button').on('click', function () {
          open();
        });
        $('.sidebar__backdrop, .sidebar__close').on('click', function () {
          close();
        });
      };
      sidebar_offcanvas();
    });

  }
  onChangeCategory(categoryId, index) {
    this.selectedCategoryUrl = this.categories.find(d => d.id == categoryId).seoUrl;
    const queryParams: any = {};
    if (this.selectedDistrictUrls.length > 0) {
      queryParams.ilce = this.selectedDistrictUrls.join(',');
    }
    this.router.navigate(["egitim-kurumlari", this.selectedCategoryUrl], { queryParams: queryParams});
    this.selectedCategoryIndex = index;
    this.selectedAttributeIds = [];
    this.baseService.getAll<CategoryAttributeListModel[]>("Attribute/GetAllAttributeByEducationCategoryId?categoryId=" + categoryId).subscribe(categoryAttributeList => {
      this.categoryAttributeList = categoryAttributeList;
      this.acdcLoadingService.hideLoading();
    });
    this.baseService.getAll<EducationFilterListModel[]>(`Education/GetAllEducationListByFilter?categoryId=${categoryId}`).subscribe(educationList => {
      this.educationFilterList = educationList;
      this.acdcLoadingService.hideLoading();
    });
  }
  getAllCallMethod() {
    this.acdcLoadingService.showLoading();
    let categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
    let districtListObservable = this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts");

    forkJoin([categoryListObservable, districtListObservable]).subscribe(results => {
      this.categories = results[0];
      this.selectedCategoryIndex = this.categories.findIndex(d => d.seoUrl == this.selectedCategoryUrl);

      if (this.selectedCategoryUrl != undefined) {
        this.selectedCategoryId = this.categories.find(d => d.seoUrl == this.selectedCategoryUrl).id;
        this.filterModel = { categoryId: this.selectedCategoryId };
        this.baseService.getAll<CategoryAttributeListModel[]>("Attribute/GetAllAttributeByEducationCategoryId?categoryId=" + this.selectedCategoryId).subscribe(categoryAttributeList => {
          this.categoryAttributeList = categoryAttributeList;
          this.acdcLoadingService.hideLoading();
        });
      }
      this.districtList = results[1].districtListModel;
      this.selectedDistrictUrls.forEach(u => {
        let district = this.districtList.find(d => d.seoUrl == u);
        if (district != undefined) {
          this.selectedDistrictIds.push(district.id);
          this.selectedDistrictIds = [...this.selectedDistrictIds];
        }
      });

      this.baseService.getAll<EducationFilterListModel[]>(`Education/GetAllEducationListByFilter?categoryId=${this.selectedCategoryId}`).subscribe(educationList => {
        this.educationFilterList = educationList;
        this.acdcLoadingService.hideLoading();
      });
    });
  }

  getSelectedDistrictName(districtId: number) {
    return this.districtList.find(d => d.id == districtId).name;
  }
  removeSelectedDistrictId(districtId: number) {
    const index: number = this.selectedDistrictIds.indexOf(districtId);
    if (index !== -1) {
      this.selectedDistrictIds.splice(index, 1);
      this.selectedDistrictIds = [...this.selectedDistrictIds];
      this.navigateFilterUrl();
    }
  }
  onChangeDistrict() {
    this.navigateFilterUrl();
  }
  //Checkbox change checked type
  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedAttributeIds.push(id);
      this.selectedAttributeIds = [...this.selectedAttributeIds];
    } else {
      const index: number = this.selectedAttributeIds.indexOf(id);
      if (index !== -1) {
        this.selectedAttributeIds.splice(index, 1);
        this.selectedAttributeIds = [...this.selectedAttributeIds];
      }
    }
    this.navigateFilterUrl();
  }
  changeeducationViewItemCount(event) {
    this.pageNumber = 1;
    this.educationViewItemCount = +event.target.value;;
  }
  getSelectedAttributeName(attributeId: number) {
    let attributeName: string;
    this.categoryAttributeList.forEach(attributeList => {
      let attributeListModel = attributeList.attributeListModel.find(d => d.id == attributeId);
      if (attributeListModel != null || attributeListModel != undefined) {
        attributeName = attributeListModel.name;
      }
    });
    return attributeName;
  }
  removeSelectedAttributeId(attributeId: number) {
    const index: number = this.selectedAttributeIds.indexOf(attributeId);
    if (index !== -1) {
      this.selectedAttributeIds.splice(index, 1);
      this.selectedAttributeIds = [...this.selectedAttributeIds];
    }
    this.navigateFilterUrl();
  }

  removeAllFilters() {
    this.selectedAttributeIds = [];
    this.selectedDistrictIds = [];
    this.navigateFilterUrl();
  }
  navigateFilterUrl() {

    this.selectedDistrictUrls = this.districtList.filter(d => this.selectedDistrictIds.includes(d.id)).map(d => d.seoUrl);
    const queryParams: any = {};
    if (this.selectedDistrictUrls.length > 0) {
      queryParams.ilce = this.selectedDistrictUrls.join(',');
    }
    if (this.selectedAttributeIds.length > 0) {
      queryParams.ozellik = this.selectedAttributeIds.join(',');
    }
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.router.navigate(
      [], navigationExtras
    );
  }
}

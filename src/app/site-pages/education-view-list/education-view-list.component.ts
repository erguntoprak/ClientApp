import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { AcdcLoadingService } from 'acdc-loading';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CategoryModel, DistrictModel, AddressModel, CategoryAttributeListModel, FilterModel, EducationListModel, EducationFilterListModel } from '../../shared/models';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';

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
  searchText: string = '';

  constructor(private baseService: BaseService, private acdcLoadingService: AcdcLoadingService,
    private route: ActivatedRoute, private router: Router, private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateTitle("İzmir Eğitim Kurumları - Özel Anaokul, Özel Eğitim Kursu, Okul Öncesi Eğitim'e ait birçok eğitim kurumunu sizin için listeledik");
    this.seoService.updateMeta('robots','index, follow');
    this.seoService.updateMeta('keywords','uzaktan eğitim, izmir, eğitim, özel, ders, anaokul, eğitim kursu, kurs, milli eğitim, güncel eğitim, online eğitim, özel eğitim');
    this.seoService.updateMeta('description',"İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl);
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.png');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.png');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.png');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl);


    this.acdcLoadingService.showLoading();
    this.route.params.subscribe(params => {
      this.selectedCategoryUrl = params['category'];
    });
    this.route.params.subscribe(params => {
      this.selectedDistrictUrls = [];
      this.getAllCallMethod();
    });
    this.route.queryParams.subscribe(params => {

      if (params['q']) {
        this.searchText = params['q'];
      }
      if (params['ilce']) {
        this.selectedDistrictUrls = params['ilce'].split(',');
      }
      if (params['ozellik']) {
        this.selectedAttributeIds = params['ozellik'].split(',').map(d => +d);
      }
    });

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
    this.router.navigate(["egitim-kurumlari", this.selectedCategoryUrl]);
    this.selectedCategoryIndex = index;
  }
  getAllCallMethod() {
    this.acdcLoadingService.showLoading();
    let categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
    let districtListObservable = this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts");
    this.selectedAttributeIds = [];
    this.selectedDistrictIds = [];

    forkJoin([categoryListObservable, districtListObservable]).subscribe(results => {
      this.categories = results[0];
      this.selectedCategoryIndex = this.categories.findIndex(d => d.seoUrl == this.selectedCategoryUrl);
      let selectedCategory = this.categories.find(d => d.seoUrl == this.selectedCategoryUrl);
      this.seoService.updateTitle(selectedCategory.name  +' kategorisinde ki birçok eğitim kurumunu sizin için listeledik - İzmir Eğitim Kurumları');
      this.seoService.updateCanonicalUrl(environment.baseUrl +'/egitim-kurumlari/'+ this.selectedCategoryUrl);

      this.selectedCategoryId = selectedCategory.id;
      this.baseService.getAll<CategoryAttributeListModel[]>("Attribute/GetAllAttributeByEducationCategoryId?categoryId=" + this.selectedCategoryId).subscribe(categoryAttributeList => {
        this.categoryAttributeList = categoryAttributeList;
        this.acdcLoadingService.hideLoading();
      });

      this.districtList = results[1].districtListModel;
      this.selectedDistrictUrls.forEach(u => {
        let district = this.districtList.find(d => d.seoUrl == u);
        if (district != undefined) {
          this.selectedDistrictIds.push(district.id);
          this.selectedDistrictIds = [...this.selectedDistrictIds];
        }
      });
      this.baseService.getAll<EducationFilterListModel[]>(`Education/GetAllEducationListByFilter?categoryId=${this.selectedCategoryId}&searchText=${this.searchText}`).subscribe(educationList => {
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

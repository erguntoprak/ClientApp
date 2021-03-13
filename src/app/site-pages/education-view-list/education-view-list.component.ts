import { Component, OnInit, AfterViewInit, ViewChildren, OnDestroy } from '@angular/core';
import { BaseService } from '../../shared/base.service';
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
export class EducationViewListComponent implements OnInit, AfterViewInit, OnDestroy {

  apiUrl = environment.apiUrl;
  @ViewChildren('filteredItems') filteredItems;
  categories: CategoryModel[] = [];
  districtList: DistrictModel[] = [];
  categoryAttributeList: CategoryAttributeListModel[] = [];
  filterModel: FilterModel;
  educationFilterList: EducationFilterListModel[];
  selectedCategoryIndex: number = null;
  selectedCategoryUrl: string;
  selectedCategoryId: number;
  selectedCategoryName: string;

  selectedDistrictIndex: number = null;
  selectedDistrictUrl: string;
  selectedDistrictId: number;
  selectedDistrictName: string;

  selectedAttributeIds: number[] = [];
  educationViewItemCount = 12;
  pageNumber: number = 1;
  searchText: string = '';
  targetValue: string = "_blank";
  subscription: any;
  subscriptionTwo: any;
  pageLoad: boolean = false;
  preloadImageHeight = '162px';

  constructor(private baseService: BaseService,
    private route: ActivatedRoute, private router: Router, private seoService: SeoService) {

  }
  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.targetValue = "_self";
      this.preloadImageHeight = '100.55px';
    }
    this.seoService.updateMeta('robots', 'index, follow');

    //Facebook Meta Tag
    this.seoService.updateMeta('og:type', 'website');
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:locale', 'tr_TR');
    this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card', 'summary_large_image');


    this.subscription = this.route.params.subscribe(params => {
      this.selectedCategoryUrl = params['category'];
      this.selectedDistrictUrl = params['district'];
      this.getAllCallMethod();
    });

    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchText = params['q'];
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
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }
  getAllCallMethod() {
    let categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
    let districtListObservable = this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts");
    this.selectedAttributeIds = [];

    this.subscriptionTwo = forkJoin([categoryListObservable, districtListObservable]).subscribe(results => {
      this.categories = results[0];
      this.selectedCategoryIndex = this.categories.findIndex(d => d.seoUrl == this.selectedCategoryUrl);
      let selectedCategory = this.categories.find(d => d.seoUrl == this.selectedCategoryUrl);
      this.selectedCategoryId = selectedCategory.id;
      this.selectedCategoryName = selectedCategory.name;
      this.baseService.getAll<CategoryAttributeListModel[]>("Attribute/GetAllAttributeByEducationCategoryId?categoryId=" + this.selectedCategoryId).subscribe(categoryAttributeList => {
        this.categoryAttributeList = categoryAttributeList;
      });

      this.districtList = results[1].districtListModel;
      this.selectedDistrictIndex = this.districtList.findIndex(d => d.seoUrl == this.selectedDistrictUrl);
      let selectedDistrict = this.districtList.find(d => d.seoUrl == this.selectedDistrictUrl);
      this.selectedDistrictId = selectedDistrict.id;
      this.selectedDistrictName = selectedDistrict.name;
      this.baseService.getAll<EducationFilterListModel[]>(`Education/GetAllEducationListByFilter?categoryId=${this.selectedCategoryId}&districtId=${this.selectedDistrictId}&searchText=${this.searchText}`).subscribe(educationList => {
        this.educationFilterList = educationList;
        this.pageLoad = true;
      });

      this.seoService.updateMeta('og:title', `${selectedDistrict.name} ${selectedCategory.name} Listesi, Fiyatları, İndirimleri`);
      this.seoService.updateMeta('og:url', environment.baseUrl + '/' + this.selectedDistrictUrl + '/' + this.selectedCategoryUrl);
      this.seoService.updateMeta('twitter:title', `${selectedDistrict.name} ${selectedCategory.name} Listesi, Fiyatları, İndirimleri`);
      this.seoService.updateMeta('twitter:url', environment.baseUrl + '/' + this.selectedDistrictUrl + '/' + this.selectedCategoryUrl);


      this.seoService.updateTitle(`${selectedDistrict.name} ${selectedCategory.name} Listesi, Fiyatları, İndirimleri`);
      this.seoService.updateCanonicalUrl(environment.baseUrl + '/' + this.selectedDistrictUrl + '/' + this.selectedCategoryUrl);

      this.seoService.updateMeta('description', `İzmir ${selectedDistrict.name} ${selectedCategory.name} fiyatlarına, fotoğraf galerileri, olanaklarına, iletişim ve konum bilgilerine ulaşmak için listelerimizi hemen inceleyin!`);
      this.seoService.updateMeta('og:description', `İzmir ${selectedDistrict.name} ${selectedCategory.name} fiyatlarına, fotoğraf galerileri, olanaklarına, iletişim ve konum bilgilerine ulaşmak için listelerimizi hemen inceleyin!`);
      this.seoService.updateMeta('twitter:description', `İzmir ${selectedDistrict.name} ${selectedCategory.name} fiyatlarına, fotoğraf galerileri, olanaklarına, iletişim ve konum bilgilerine ulaşmak için listelerimizi hemen inceleyin!`);
    });
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
  removeSearchText() {
    this.searchText = '';
  }
  removeAllFilters() {
    this.selectedAttributeIds = [];
    this.searchText = '';
    this.navigateFilterUrl();
  }
  navigateFilterUrl() {
    const queryParams: any = {};

    if (this.searchText != '') {
      queryParams.q = this.searchText;
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

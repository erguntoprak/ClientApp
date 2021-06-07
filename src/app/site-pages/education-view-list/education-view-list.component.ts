import { Component, OnInit, AfterViewInit, ViewChildren, OnDestroy, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { CategoryModel, DistrictModel, AddressModel, CategoryAttributeListModel, FilterModel, EducationFilterListModel } from '../../shared/models';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';
import { DOCUMENT } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Component({
  selector: 'se-education-view-list',
  templateUrl: './education-view-list.component.html',
  styleUrls: ['./education-view-list.component.scss']
})
export class EducationViewListComponent implements OnInit, OnDestroy {

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
  pageLoad: boolean = false;
  preloadImageHeight = '162px';
  sidebar = false;
  subscriptionOne: Subscription;
  subscriptionTwo: Subscription;
  subscriptionThree: Subscription;


  constructor(private baseService: BaseService,private state: TransferState,
    private route: ActivatedRoute, private router: Router, private seoService: SeoService,
    @Inject(DOCUMENT) private _document) {
  }
  ngOnDestroy(): void {
    this.subscriptionOne.unsubscribe();
  }
  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
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


    this.subscriptionOne = this.route.params.subscribe(params => {
      this.selectedCategoryUrl = params['category'];
      this.selectedDistrictUrl = params['district'];
      this.getAllCallMethod().then(result => {
        if (!result) {
          this.router.navigateByUrl("/sayfa-bulunamadi", { skipLocationChange: true });
        }
        else{
        }
      })
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
  openSidebar() {
    this.sidebar = true;
    this._document.body.style.overflowY = 'hidden';
  }
  closeSidebar() {
    this.sidebar = false;
    this._document.body.style.overflowY = 'auto';
  }

  public async getAllCallMethod() {
    let $categoryListObservable = this.baseService.getAll<any>("Category/GetAllCategoryList");
    let $districtListObservable = this.baseService.getAll<any>("Address/GetCityNameDistricts");
    const getAllCategoryListDataKey = makeStateKey("GetAllCategoryList");
    const getCityNameDistrictsDataKey = makeStateKey("GetCityNameDistricts");
    this.selectedAttributeIds = [];

    const getAllCategoryListDataValue = this.state.get<any>(getAllCategoryListDataKey, null);
    if(getAllCategoryListDataValue){
      this.categories = getAllCategoryListDataValue;
    }else{
      let categoryList = await $categoryListObservable.toPromise();
      this.categories = categoryList;
      this.state.set(getAllCategoryListDataKey, categoryList);
    }

    const getCityNameDistrictsDataValue = this.state.get<any>(getCityNameDistrictsDataKey, null);
    if(getCityNameDistrictsDataValue){
      this.districtList = getCityNameDistrictsDataValue;
    }else{
      let districtList = (await $districtListObservable.toPromise()).districtListModel;
      this.districtList = districtList;
      this.state.set(getCityNameDistrictsDataKey, districtList);
    }

    this.selectedCategoryIndex = this.categories.findIndex(d => d.seoUrl == this.selectedCategoryUrl);
    if (this.selectedCategoryIndex == -1) {
      return false;
    }
    let selectedCategory = this.categories.find(d => d.seoUrl == this.selectedCategoryUrl);
    this.selectedCategoryId = selectedCategory.id;
    this.selectedCategoryName = selectedCategory.name;

    let $attributeByEducationCategoryId = this.baseService.getAll<CategoryAttributeListModel[]>("Attribute/GetAllAttributeByEducationCategoryId?categoryId=" + this.selectedCategoryId);
    const getAllAttributeByEducationCategoryIdDateKey = makeStateKey(`GetAllAttributeByEducationCategoryId_${selectedCategory.id}`);

    
    this.subscriptionTwo = this.baseService.getCachedObservable<CategoryAttributeListModel[]>($attributeByEducationCategoryId, getAllAttributeByEducationCategoryIdDateKey).
      subscribe(categoryAttributeList => {
        this.categoryAttributeList = categoryAttributeList;
      });

    this.selectedDistrictIndex = this.districtList.findIndex(d => d.seoUrl == this.selectedDistrictUrl);
    if (this.selectedDistrictIndex == -1) {
      return false;
    }
    let selectedDistrict = this.districtList.find(d => d.seoUrl == this.selectedDistrictUrl);
    this.selectedDistrictId = selectedDistrict.id;
    this.selectedDistrictName = selectedDistrict.name;

    let $educationListByFilter = this.baseService.getAll<EducationFilterListModel[]>(`Education/GetAllEducationListByFilter?categoryId=${this.selectedCategoryId}&districtId=${this.selectedDistrictId}&searchText=${this.searchText}`);
    const getAllEducationListByFilterDateKey = makeStateKey(`GetAllEducationListByFilter_${this.selectedCategoryId}_${this.selectedDistrictId}`);


    this.subscriptionThree = this.baseService.getCachedObservable<EducationFilterListModel[]>($educationListByFilter, getAllEducationListByFilterDateKey).
    subscribe(educationList => {
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

    return true;
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
    this.educationViewItemCount = +event.target.value;
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
    this.navigateFilterUrl();
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

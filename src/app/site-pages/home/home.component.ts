import { Component, OnInit, AfterViewInit, ViewEncapsulation, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryModel, EducationListModel, DistrictModel, AddressModel, SearchResult, EducationSearchResult } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { makeStateKey } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  apiUrl = environment.apiUrl;
  searchForm: FormGroup;
  categories: CategoryModel[];
  educationList: EducationListModel[];
  districtList: DistrictModel[];
  selectedCategoryId: number;
  categoryHomePage = new FormControl();
  district = new FormControl();
  isSearchResult: boolean = false;
  selectedDistrictId: number;
  selectedSearchFormCategoryName: string = "Özel Anaokul";
  selectedCategoryUrl: string = 'kres-ve-anaokulu';
  searchResult: SearchResult[] = [];
  educationSearchResult: EducationSearchResult[];
  preloadImageHeight = '162px';
  subscriptionOne: Subscription;
  subscriptionTwo: Subscription;
  subscriptionThree: Subscription;
  subscriptionFour: Subscription;


  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private seoService: SeoService, private router: Router) {
    this.searchForm = this.formBuilder.group({
      searchText: [null],
      categoryId: [1]
    });
  }
  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.preloadImageHeight = '100.55px';
    }
    this.getAllCallMethod();
    this.seoService.updateTitle("İzmir Eğitim Kurumları - Anaokulları, Kreşler, Dil Kursları, Kolejler");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/');
    this.seoService.updateMeta('robots', 'index, follow');
    this.seoService.updateMeta('description', "İzmir bölgesindeki tüm anaokulu, okul öncesi, kreş, kolej ve dil kursları tek tıkla elinizin altında.");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title', 'İzmir Eğitim Kurumları - Anaokulları, Kreşler, Dil Kursları, Kolejler');
    this.seoService.updateMeta('og:type', 'website');
    this.seoService.updateMeta('og:url', environment.baseUrl);
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir bölgesindeki tüm anaokulu, okul öncesi, kreş, kolej ve dil kursları tek tıkla elinizin altında.");
    this.seoService.updateMeta('og:locale', 'tr_TR');
    this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'İzmir Eğitim Kurumları - Anaokulları, Kreşler, Dil Kursları, Kolejler');
    this.seoService.updateMeta('twitter:description', "İzmir bölgesindeki tüm anaokulu, okul öncesi, kreş, kolej ve dil kursları tek tıkla elinizin altında.");
    this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card', 'summary_large_image');
    this.seoService.updateMeta('twitter:url', environment.baseUrl);

  }
  ngAfterViewInit(): void {
    this.searchForm.get('categoryId').valueChanges.subscribe(value => {
      if (value == null) {
        this.selectedSearchFormCategoryName = "Eğitim Kurumları";
        return;
      }
      if (this.categories.length > 0) {
        let category = this.categories.find(d => d.id == value);
        this.selectedSearchFormCategoryName = category.name;
        this.selectedCategoryUrl = category.seoUrl;
      }
    });
    this.categoryHomePage.valueChanges.subscribe(value => {
      if (value == null) {
        value = 0;
      }
      if (this.district.value == null) {
        this.selectedDistrictId = 0;
      }
      else {
        this.selectedDistrictId = this.district.value;
      }
      this.baseService.getAll<EducationListModel[]>(`Education/GetAllEducationListByCategoryIdAndDistrictId?categoryId=${value}&districtId=${this.selectedDistrictId}&count=20`).subscribe(educationList => {
        this.educationList = educationList;
      });
    });
    this.district.valueChanges.subscribe(value => {
      if (value == null) {
        value = 0;
      }
      if (this.categoryHomePage.value == null) {
        this.selectedCategoryId = 0;
      } else {
        this.selectedCategoryId = this.categoryHomePage.value;
      }
      this.baseService.getAll<EducationListModel[]>(`Education/GetAllEducationListByCategoryIdAndDistrictId?categoryId=${this.selectedCategoryId}&districtId=${value}&count=20`).subscribe(educationList => {
        this.educationList = educationList;
      });
    });
  }

  onSearchFormSubmit() {
    if (this.searchForm.get('searchText').value == '' || this.searchForm.get('searchText').value == null) {
      this.router.navigate([`/buca/${this.selectedCategoryUrl}`]);
    }
    else {
      this.router.navigate([`/buca/${this.selectedCategoryUrl}`], { queryParams: { q: this.searchForm.get('searchText').value } });
    }
  }
  focusFunction() {
    this.isSearchResult = true;
  }
  focusOutFunction() {
    setTimeout(() => {
      this.isSearchResult = false;
    }, 300);
  }
  getAllCallMethod() {
    let $categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
    let $districtListObservable = this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts");
    let $educationListObservable = this.baseService.getAll<EducationListModel[]>("Education/GetAllEducationListByRandomCategoryId?count=20");
    let $educationSearchListObservable = this.baseService.getAll<EducationSearchResult[]>("Education/GetAllSearchEducationList");

    const getAllCategoryListDataKey = makeStateKey("GetAllCategoryList");
    const getCityNameDistrictsDataKey = makeStateKey("GetCityNameDistricts");
    const getAllEducationListByRandomCategoryIdDataKey = makeStateKey("GetAllEducationListByRandomCategoryId");
    const GetAllSearchEducationListDataKey = makeStateKey("GetAllSearchEducationList");

    this.subscriptionOne = this.baseService.getCachedObservable<CategoryModel[]>($categoryListObservable,getAllCategoryListDataKey).subscribe(data=>{
      this.categories = data;
    });
    this.subscriptionTwo = this.baseService.getCachedObservable<AddressModel>($districtListObservable,getCityNameDistrictsDataKey).subscribe(data=>{
      this.districtList = data.districtListModel;
      this.districtList.forEach(d => {
        this.searchResult.push({ text: d.name, districtUrl: d.seoUrl });
      });
    });
    this.subscriptionThree = this.baseService.getCachedObservable<EducationListModel[]>($educationListObservable,getAllEducationListByRandomCategoryIdDataKey).subscribe(data=>{
      this.educationList = data;
    });
    this.subscriptionFour = this.baseService.getCachedObservable<EducationSearchResult[]>($educationSearchListObservable,GetAllSearchEducationListDataKey).subscribe(searchList => {
      this.educationSearchResult = searchList;
    });
  }
  ngOnDestroy() {
    this.subscriptionOne.unsubscribe();
    this.subscriptionTwo.unsubscribe();
    this.subscriptionThree.unsubscribe();
    this.subscriptionFour.unsubscribe();
  }

}

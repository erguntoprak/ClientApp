import { Component, OnInit, AfterViewInit, ViewEncapsulation, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryModel, EducationListModel, DistrictModel, AddressModel, SearchResult, EducationSearchResult } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';
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
  targetValue: string = "_blank";
  preloadImageHeight = '162px';
  subscription: any;

  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private seoService: SeoService, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    this.searchForm = this.formBuilder.group({
      searchText: [null],
      categoryId: [1]
    });
  }
  ngOnInit(): void {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.targetValue = "_self";
      this.preloadImageHeight = '100.55px';
    }
    this.seoService.updateTitle("İzmir Eğitim Kurumları - Anaokulu, Kreş, Özel Öğretim Kursu");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/');
    this.seoService.updateMeta('robots', 'index, follow');
    this.seoService.updateMeta('description', "İzmir kreş, anaokulu, özel öğretim kursu, ilkokul, ortaokul, lise, yabancı dil kursu, fiyatları, okullar, özel öğretim kurumları, erken kayıt, kayıt ücreti");

    //Facebook Meta Tag
    this.seoService.updateMeta('og:title', 'İzmir Eğitim Kurumları - Anaokulu, Kreş, Özel Öğretim Kursu');
    this.seoService.updateMeta('og:type', 'website');
    this.seoService.updateMeta('og:url', environment.baseUrl);
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir kreş, anaokulu, özel öğretim kursu, ilkokul, ortaokul, lise, yabancı dil kursu, fiyatları, okullar, özel öğretim kurumları, erken kayıt, kayıt ücreti");
    this.seoService.updateMeta('og:locale', 'tr_TR');
    this.seoService.updateMeta('og:image:secure_url', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'İzmir Eğitim Kurumları - Anaokulu, Kreş, Özel Öğretim Kursu');
    this.seoService.updateMeta('twitter:description', "İzmir kreş, anaokulu, özel öğretim kursu, ilkokul, ortaokul, lise, yabancı dil kursu, fiyatları, okullar, özel öğretim kurumları, erken kayıt, kayıt ücreti");
    this.seoService.updateMeta('twitter:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card', 'summary_large_image');
    this.seoService.updateMeta('twitter:url', environment.baseUrl);

    this.getAllCallMethod();
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
      this.educationList = undefined;
      this.baseService.getAll<EducationListModel[]>(`Education/GetAllEducationListByCategoryIdAndDistrictId?categoryId=${value}&districtId=${this.selectedDistrictId}`).subscribe(educationList => {
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
      this.baseService.getAll<EducationListModel[]>(`Education/GetAllEducationListByCategoryIdAndDistrictId?categoryId=${this.selectedCategoryId}&districtId=${value}`).subscribe(educationList => {
        this.educationList = educationList;
      });
    });
    this.baseService.getAll<EducationSearchResult[]>("Education/GetAllSearchEducationList").subscribe(searchList => {
      this.educationSearchResult = searchList;
    });
  }

  onSearchFormSubmit() {
    console.log(this.searchForm.get('searchText').value);
    if (this.searchForm.get('searchText').value == '' || this.searchForm.get('searchText').value == null) {
      if (isPlatformBrowser(this.platformId)) {
        window.location.href = `${environment.baseUrl}/buca/${this.selectedCategoryUrl}`;
      }
    }
    else {
      if (isPlatformBrowser(this.platformId)) {
      window.location.href = `${environment.baseUrl}/buca/${this.selectedCategoryUrl}?q=${this.searchForm.get('searchText').value}`;
      }
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
    let categoryListObservable = this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList");
    let districtListObservable = this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts");
    let educationListObservable = this.baseService.getAll<EducationListModel[]>("Education/GetAllEducationListByRandomCategoryId");


    this.subscription = forkJoin([educationListObservable, categoryListObservable, districtListObservable]).subscribe(results => {
      this.educationList = results[0];
      this.categories =  results[1];
      this.districtList = results[2].districtListModel;
      this.districtList.forEach(d => {
        this.searchResult.push({ text: d.name, districtUrl: d.seoUrl });
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

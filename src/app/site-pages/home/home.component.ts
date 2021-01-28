import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryModel, EducationListModel, DistrictModel, AddressModel, SearchResult, EducationSearchResult } from '../../shared/models';
import { BaseService } from '../../shared/base.service';
import { environment } from 'src/environments/environment';
import { SeoService } from 'src/app/_services/seo.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

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
  selectedCategoryUrl: string = '/ozel-anaokul';
  searchResult: SearchResult[] = [];
  educationSearchResult: EducationSearchResult[];

  constructor(private formBuilder: FormBuilder, private baseService: BaseService, private seoService: SeoService, private router: Router) {
    this.searchForm = this.formBuilder.group({
      searchText: [null],
      categoryId: [1]
    });
  }
  ngOnInit(): void {
    this.seoService.updateTitle("İzmir Eğitim Kurumları - Özel Anaokul, Özel Eğitim Kursu, Okul Öncesi Eğitim'e ait birçok bilgiyi bulabilirsin");
    this.seoService.updateCanonicalUrl(environment.baseUrl);
    this.seoService.updateMeta('robots','index, follow');
    this.seoService.updateMeta('keywords','uzaktan eğitim, izmir, eğitim, özel, ders, anaokul, eğitim kursu, kurs, milli eğitim, güncel eğitim, online eğitim, özel eğitim');
    this.seoService.updateMeta('description',"İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    
    //Facebook Meta Tag
    this.seoService.updateMeta('og:title','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:type','website');
    this.seoService.updateMeta('og:url',environment.baseUrl);
    this.seoService.updateMeta('og:image', environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('og:site_name','İzmir Eğitim Kurumları');
    this.seoService.updateMeta('og:description', "İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('og:locale','tr_TR');
    this.seoService.updateMeta('og:image:secure_url',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');

    //Twitter Meta Tag
    this.seoService.updateMeta('twitter:title', 'İzmir Eğitim Kurumları');
    this.seoService.updateMeta('twitter:description',"İzmir'de bulunan özel anaokul, okul öncesi eğitim, özel öğretim kursu gibi birçok eğitim kurumunu İzmir Eğitim Kurumları ayrıcalıklarıyla bulabilirsin.");
    this.seoService.updateMeta('twitter:image',environment.apiUrl + '/images/izmir-egitim-kurumlari.jpg');
    this.seoService.updateMeta('twitter:card','summary_large_image');
    this.seoService.updateMeta('twitter:url',environment.baseUrl);

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
        this.selectedCategoryUrl = '/' + category.seoUrl;
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
      this.router.navigate(['/egitim-kurumlari/' + this.selectedCategoryUrl]);
    }
    else {
      this.router.navigate(['/egitim-kurumlari/' + this.selectedCategoryUrl], { queryParams: { q: this.searchForm.get('searchText').value } });
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
    this.baseService.getAll<CategoryModel[]>("Category/GetAllCategoryList").subscribe(categories => {
      this.categories = categories;
    });
    this.baseService.getAll<EducationListModel[]>("Education/GetAllEducationListByRandomCategoryId").subscribe(educationList => {
      this.educationList = educationList;
    });
    this.baseService.getAll<AddressModel>("Address/GetCityNameDistricts").subscribe(addressModel => {
      this.districtList = addressModel.districtListModel;
      this.districtList.forEach(d => {
        this.searchResult.push({ text: d.name, url: 'egitim-kurumlari', districtUrl: d.seoUrl });
      });
    });
  }

}

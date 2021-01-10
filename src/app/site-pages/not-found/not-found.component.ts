import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/_services/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'se-not-found',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {


  constructor(private seoService: SeoService) {

  }
  ngOnInit(): void {
    this.seoService.updateTitle("Sayfa Bulunamadı - İzmir Eğitim Kurumları");
    this.seoService.updateCanonicalUrl(environment.baseUrl + '/sayfa-bulunamadi');
  }
  
}

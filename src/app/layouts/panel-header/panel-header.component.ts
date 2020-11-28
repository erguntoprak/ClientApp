import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html'
})
export class PanelHeaderComponent implements OnInit {

  constructor(private authService:AuthService) {
    
  }
  userModel: any;
  ngOnInit(): void {
    this.userModel = JSON.parse(localStorage.getItem('currentUser'));
  }
  logout(){
    this.authService.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'se-e-mail-confirmation-message',
  templateUrl: './e-mail-confirmation-message.component.html'
})
export class EmailConfirmationMessageComponent implements OnInit {

  isEmailConfirmationSuccessMessage = false;
  emailConfirmationSuccessMessage : string;

  constructor(private baseService: BaseService, private route: ActivatedRoute, private router:Router) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userId'] && params['confirmation-token']) {
        this.baseService.post("Account/EmailConfirmation", { userId: params['userId'], confirmationToken: params['confirmation-token'] }).subscribe(response => {
          this.isEmailConfirmationSuccessMessage = true;
          this.emailConfirmationSuccessMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/giris-yap']);
          }, 5000);
        }
        );
      }
    });
  }
}

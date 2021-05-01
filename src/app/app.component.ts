import { AuthService } from './service/auth.service';
import { Component, ViewEncapsulation, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthService){;
  }



  ngOnInit(): void {
     this.authService.autoLogin();
  }

}

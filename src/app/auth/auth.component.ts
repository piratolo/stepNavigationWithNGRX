import { Subject, Observable, Subscription } from 'rxjs';
import { User } from './../model/user.model';
import { IUser } from './../interface/IUser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorHandler } from './../error/errorHandler';
import { AuthService } from './../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized, ActivatedRouteSnapshot } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {

  user:User = null;

  loginForm:FormGroup;
  errorHandler: ErrorHandler;

  notAuthorizeMessage:string = "";

  private userSub:Subscription;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.authService.setRedirectUrl(this.router.url);

    this.loginForm = this.formBuilder.group({
      "user" : ["", [Validators.required, Validators.pattern("[a-zA-Z@0-9]*")]],
      "password" : ["",  [Validators.required, Validators.pattern("[a-zA-Z@0-9]*")]]
    });
    this.errorHandler = new ErrorHandler();

    this.userSub = this.authService.user.subscribe(
      user => {
        this.user = user;
        if(user != null){
          this.user.isAuthenticated = true;
        }
      },
      error => {
        this.errorHandler.showError(this.modalService, error);
      }
    );

    this.authService.notAuthorize.subscribe(notAuthorize => {
      if(notAuthorize){
        this.notAuthorizeMessage = "Per accedere alla pagina desiderata effettua prima il login"
      }
      else{
        this.notAuthorizeMessage = "";
      }
    });

  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.get("user").value, this.loginForm.get("password").value).subscribe(
        result=>{
        },
        error =>{
          this.errorHandler.showError(this.modalService, error);
        }
      );
    }
  }

  onLogout(){
    this.authService.logout();
  }




}

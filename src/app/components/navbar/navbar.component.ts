import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
    isAuthenticated = true;
    private userSub!: Subscription;
    constructor(private authService: AuthService, private router: Router){}
    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user=>{
        this.isAuthenticated = !!user;   // works as !user? 'false' : 'true'   
      });
    }
    onLogout(){
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }
    ngOnDestroy(): void {
      this.userSub.unsubscribe()
    }
}

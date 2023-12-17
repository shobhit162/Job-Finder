import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loc: location[] = [
    {value: 'Pune', viewValue: 'Pune'},
    {value: 'Bangalore', viewValue: 'Bangalore'},
    {value: 'Delhi', viewValue: 'Delhi'},
    {value: 'Hyderabad', viewValue: 'Hyderabad'},
    {value: 'Remote', viewValue: 'Remote'},
  ];

  searchSkills: string = '';
  searchLocation: string = '';

  constructor(private router: Router) {}

  onSearchJob() {
    // Redirect to the "Find a Job" component with query parameters
    this.router.navigate(['/find-job'], {
      queryParams: {
        skills: this.searchSkills,
        location: this.searchLocation
      }
    });
  }
}

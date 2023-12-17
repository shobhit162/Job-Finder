import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SnackcoreService } from '../core/snackcore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.css']
})
export class FindJobComponent implements OnInit {
  jobs: any[] = []; 
  filteredJobs: any[] = [];
  isAuthenticated = true;
  private userSub!: Subscription;
  // this.userService =new UserService(); // tight coupling way, we write it in constructor

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute, 
    private userService:UserService,  // using services
    private snackcoreService: SnackcoreService,
    private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;   // works as !user? 'false' : 'true'   
    });
    this.userService.getJobDetails().subscribe({
      next:(data: User[]) => {
        this.jobs = data;
  
         this.route.queryParams.subscribe((params) => { // here we are retrieving query parameters from the URL
          const searchSkills = params['skills'];
          const searchLocation = params['location'];

          this.filteredJobs = this.filterJobs(searchSkills, searchLocation);
        });
      },
      error:(err:any) => {
        console.error('Error fetching job data:', err);
      }
    }
    );
  }
  deleteJob(job: any) {
    const index = this.jobs.indexOf(job);
    if(index !== -1) {
      this.jobs.splice(index, 1);  // at index, remove 1 item
    }
    this.userService.deleteJobDetails(job.id).subscribe({
      next:(res) => {
        this.snackcoreService.openSnackBar('Job deleted successfully', 'success');
        this.ngOnInit();
      },
      error:(err) => {
        console.error('Error deleting job:', err);
      }
  });
  }

  editJob(job: any) {
    this.router.navigate(['/post-job'], {
      queryParams: {
        id: job.id, // Pass the job ID to identify which job to edit
      }
    });
  }

  filterJobs(skills: string, location: string): any[] {
    // Implementing filtering logic here based on skills and location
    return this.jobs.filter((job) => {
      const skillMatch = skills ? job.skills.toLowerCase().includes(skills.toLowerCase()) : true;
      const locationMatch = location ? job.location.toLowerCase() === location.toLowerCase() : true;

      return skillMatch && locationMatch;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }
}

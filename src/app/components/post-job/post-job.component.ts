// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { SnackcoreService } from '../core/snackcore.service';
// import { UserService } from 'src/app/services/user.service';    // iska use krna h... kyuki servies important h.. aise direct nhi krna 
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-post-job',
//   templateUrl: './post-job.component.html',
//   styleUrls: ['./post-job.component.css']
// })

// export class PostJobComponent implements OnInit {
// isLinear = true; 
// firstFormGroup!: FormGroup;
// secondFormGroup!: FormGroup;
// thirdFormGroup!: FormGroup;
// fourthFormGroup!: FormGroup;
// fifthFormGroup!: FormGroup;
// sixthFormGroup!: FormGroup;
// seventhFormGroup!: FormGroup;

// constructor(
//   private _formBuilder: FormBuilder, 
//   private http: HttpClient,
//   private router:Router,
//   private route:ActivatedRoute,
//   private snackcoreService: SnackcoreService,
//   private userService: UserService
//   ) {}
 
//   isPrefilled:boolean=false;
//   id:number=0;

// ngOnInit() {
//   // Initializing form groups
//   this.firstFormGroup = this._formBuilder.group({
//     company: ['', Validators.required]
//   });

//   this.secondFormGroup = this._formBuilder.group({
//     apply_now: ['', Validators.required]
//   });

//   this.thirdFormGroup = this._formBuilder.group({
//     location: ['', Validators.required]
//   });

//   this.fourthFormGroup = this._formBuilder.group({
//     skills: ['', Validators.required]
//   });

//   this.fifthFormGroup = this._formBuilder.group({
//     pack: ['', Validators.required]
//   });

//   this.sixthFormGroup = this._formBuilder.group({
//     logo: ['', Validators.required]
//   });

//   this.seventhFormGroup = this._formBuilder.group({
//     profile: ['', Validators.required]
//   });

//   // getting pre filled data and assigning it to formcontrolname
//   this.route.queryParams.subscribe((params) => {
//     const jobId = params['id'];
//     this.id=jobId
//     if (jobId) {
//       this.isPrefilled=true;
//       this.userService.getJobDetails1(jobId).subscribe({
//         next:(jobDetails:any) => {
//           this.firstFormGroup.patchValue({
//             company: jobDetails.company,
//           });
//           this.secondFormGroup.patchValue({
//             apply_now: jobDetails.apply_now,
//           });
//           this.thirdFormGroup.patchValue({
//             location: jobDetails.location,
//           });
//           this.fourthFormGroup.patchValue({
//             skills: jobDetails.skills,
//           });
//           this.fifthFormGroup.patchValue({
//             pack: jobDetails.pack,
//           });
//           this.sixthFormGroup.patchValue({
//             logo: jobDetails.logo,
//           });
//           this.seventhFormGroup.patchValue({
//             profile: jobDetails.profile,
//           });
//         },
//         error:(err:any) => {
//           console.error('Error fetching job details:', err);
//         }
//     });
//     }
//   });
// }


// onSubmit() {
//   if(this.isPrefilled){
//     const formData = {
//       company: this.firstFormGroup.value.company,
//       apply_now: this.secondFormGroup.value.apply_now,
//       location: this.thirdFormGroup.value.location,
//       skills: this.fourthFormGroup.value.skills,
//       pack: this.fifthFormGroup.value.pack,
//       logo: this.sixthFormGroup.value.logo,
//       profile: this.seventhFormGroup.value.profile,
//     };
//    this.userService.updateJobDetails(formData, this.id).subscribe({
//     next:(val:any)=>{
//       this.snackcoreService.openSnackBar("Job details updated successfully", "Done");
//       this.router.navigateByUrl('/find-job');
//     },
//     error: (err:any)=>{
//       console.log(err);
//     }
//    })
//   }
//   else{
//   const formData = {
//     company: this.firstFormGroup.value.company,
//     apply_now: this.secondFormGroup.value.apply_now,
//     location: this.thirdFormGroup.value.location,
//     skills: this.fourthFormGroup.value.skills,
//     pack: this.fifthFormGroup.value.pack,
//     logo: this.sixthFormGroup.value.logo,
//     profile: this.seventhFormGroup.value.profile,
//   };

//   this.userService.addJobDetails(formData).subscribe({
//       next:(res:any) => {
//         this.snackcoreService.openSnackBar("Job details added successfully", "Done");
//         console.log('Data posted successfully', res);
//         this.router.navigateByUrl('/find-job')
//       },
//       error:(err:any) => {
//         console.error('Error posting data:', err);
//       }
// });
// }
// }

// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackcoreService } from '../core/snackcore.service';
import { UserService } from 'src/app/services/user.service';    
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})

export class PostJobComponent implements OnInit {
  jobForm!: FormGroup;
  isPrefilled: boolean = false;
  id: number = 0;

  constructor(
    private _formBuilder: FormBuilder, 
    private http: HttpClient,
    private router:Router,
    private route:ActivatedRoute,
    private snackcoreService: SnackcoreService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.jobForm = this._formBuilder.group({
      company: ['', Validators.required],
      apply_now: ['', Validators.required],
      location: ['', Validators.required],
      skills: ['', Validators.required],
      pack: ['', Validators.required],
      logo: ['', Validators.required],
      profile: ['', Validators.required]
    });

    this.route.queryParams.subscribe((params) => {
      const jobId = params['id'];
      this.id = jobId;
      if (jobId) {
        this.isPrefilled = true;
        this.userService.getJobDetails1(jobId).subscribe({
          next: (jobDetails: any) => {
            this.jobForm.patchValue(jobDetails);
          },
          error: (err: any) => {
            console.error('Error fetching job details:', err);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.jobForm.invalid) {
      return;
    }
    
    const formData = this.jobForm.value;
    if (this.isPrefilled) {
      this.userService.updateJobDetails(formData, this.id).subscribe({
        next: (val: any) => {
          this.snackcoreService.openSnackBar("Job details updated successfully", "Done");
          this.router.navigateByUrl('/find-job');
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } else {
      this.userService.addJobDetails(formData).subscribe({
        next: (res: any) => {
          this.snackcoreService.openSnackBar("Job details added successfully", "Done");
          console.log('Data posted successfully', res);
          this.router.navigateByUrl('/find-job');
        },
        error: (err: any) => {
          console.error('Error posting data:', err);
        }
      });
    }
  }

  resetForm() {
    this.jobForm.reset();
  }
}

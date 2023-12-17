import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})


export class UserService { 

  constructor(private http: HttpClient) { }
  addJobDetails(data:any): Observable<any>{
    return this.http.post('https://job-finder-9b1f0-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json', data);
  }

  getJobDetails(): Observable<User[]> {
    return this.http.get<Record<string, User>>('https://job-finder-9b1f0-default-rtdb.asia-southeast1.firebasedatabase.app/jobs.json').pipe(
      map(res => {
        const jobsArray: User[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            jobsArray.push({ ...res[key], id: key });
          }
        }
        return jobsArray;
      })
    );
  }

  deleteJobDetails(id:number): Observable<any>{
    return this.http.delete(`https://job-finder-9b1f0-default-rtdb.asia-southeast1.firebasedatabase.app/jobs/${id}.json`);
  } 

  updateJobDetails(data:any, id:number):Observable<any>{
    return this.http.put(`https://job-finder-9b1f0-default-rtdb.asia-southeast1.firebasedatabase.app/jobs/${id}.json`, data)
  }

  getJobDetails1(id:number):Observable<any>{
    return this.http.get(`https://job-finder-9b1f0-default-rtdb.asia-southeast1.firebasedatabase.app/jobs/${id}.json`)
  }
}

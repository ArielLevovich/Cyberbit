import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  prefix(): string {
    return `Tasks/`;
  }

  doneAllPrefix(): string {
    return `Tasks/doneAll/`;
  }

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.gw}${this.prefix()}`).pipe(
      catchError(_ => of([] as Task[]))
    )
  }
  
  markTasksAsDone(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.gw}${this.doneAllPrefix()}${userId}`).pipe(
        catchError(_ => of())
      )
  }
}


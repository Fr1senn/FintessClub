import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Attendance } from "../models/attendance";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getAttendance() :Observable<Attendance>{
    return this.http.get<Attendance>(this.apiUrl + '/Attendance/GetAttendance');
  }

  public getAttendanceByUser(userFirstName: string, userLastName: string): Observable<Attendance> {
    return this.http.get<Attendance>(this.apiUrl + '/Attendance/GetAttandanceByUser', {
      params: {
        'userFirstName': userFirstName,
        'userLastName': userLastName
      }
    });
  }

  public getAttendanceFromTill(attendanceDateFrom: string, attendanceDateTill: string) {
    return this.http.get<Attendance>(this.apiUrl + '/Attendance/GetAttendanceFromTill', {
      params: {
        'attendanceDateFrom': attendanceDateFrom,
        'attendanceDateTill': attendanceDateTill
      }
    });
  }

  public createAttendance(userId: number) {
    return this.http.post(this.apiUrl + '/Attendance/CreateAttendance', userId, { responseType: "text" as "json" });
  }
}

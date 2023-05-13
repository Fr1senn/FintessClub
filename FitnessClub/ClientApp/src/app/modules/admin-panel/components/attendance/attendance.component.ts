import { Component, OnInit } from '@angular/core';
import { Attendance } from "../../../../models/attendance";
import { AttendanceService } from "../../../../services/attendance.service";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  public attendance: Attendance[] = [];
  public attendanceFrom: string = '';
  public attendanceTill: string = '';
  public userName: string = '';

  private readonly attendanceService: AttendanceService;

  constructor(attendanceService: AttendanceService) {
    this.attendanceService = attendanceService;
  }

  ngOnInit(): void {
    this.getAttendance();
  }

  public getAttendance() {
    this.attendanceService.getAttendance().subscribe(data => {
      this.attendance = Object.values(data);
    });
  }

  public getAttendanceByUser() {
    let userName: string[] = [];
    if (this.userName === '') {
      userName[0] = this.getUniqueUsers()[0]?.user?.firstName!;
      userName[1] = this.getUniqueUsers()[0]?.user?.lastName!;
    } else {
      userName = this.userName.split(' ');
    }
    this.attendanceService.getAttendanceByUser(userName[0], userName[1]).subscribe(data => {
      this.attendance = Object.values(data);
    });
  }

  public getAttendanceFromTill() {
    this.attendanceService.getAttendanceFromTill(this.attendanceFrom, this.attendanceTill).subscribe(data => {
      this.attendance = Object.values(data);
    });
  }

  public getUniqueUsers() {
    let uniqueAttendanceSet = new Set();
    let uniqueAttendanceArr = [];

    for (let i = 0; i < this.attendance.length; i++) {
      let attendance = this.attendance[i];

      if (!uniqueAttendanceSet.has(attendance.userId)) {
        uniqueAttendanceSet.add(attendance.userId);
        uniqueAttendanceArr.push(attendance);
      }
    }
    return uniqueAttendanceArr;
  }
}

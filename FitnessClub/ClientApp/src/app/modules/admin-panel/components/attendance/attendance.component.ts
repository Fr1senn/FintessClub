import { Component, OnInit } from '@angular/core';
import { Attendance } from "../../../../models/attendance";
import { User } from '../../../../models/user';
import { AttendanceService } from "../../../../services/attendance.service";
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  public attendance: Attendance[] = [];
  public users: User[] = [];
  public attendanceFrom: string = '';
  public attendanceTill: string = '';
  public userName: string = '';
  public newAttendanceDate = {
    userName: '',
  };

  private readonly attendanceService: AttendanceService;
  private readonly userService: UserService;

  constructor(attendanceService: AttendanceService, userService: UserService) {
    this.attendanceService = attendanceService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.getAttendance();
    this.userService.getUsers().subscribe(data => {
      this.users = Object.values(data);
    })
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

  public createAttendance() {
    let userName: string[] = [];
    if (this.newAttendanceDate.userName === '') {
      userName[0] = this.users[0]?.firstName!;
      userName[1] = this.users[0]?.lastName!;
    } else {
      userName = this.newAttendanceDate.userName.split(' ');
    }
    let userId = this.users.find(user => user.firstName === userName[0] && user.lastName === userName[1])?.id;
    this.attendanceService.createAttendance(userId!).subscribe(() => {
      window.location.reload();
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

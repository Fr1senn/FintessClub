import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FormGroup } from '@angular/forms';
import { Review } from "../models/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly http: HttpClient;
  private readonly apiUrl: string = environment.baseApiUrl;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public edit(form: FormGroup) {
    return this.http.patch<Review>(this.apiUrl + '/Review/Edit', form.getRawValue(), {
      observe: "response",
      responseType: "text" as "json"
    });
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + '/Review/Delete', { body: id, responseType: "text" as "json" });
  }
}

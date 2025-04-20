import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlserviceService {

  constructor(private _http: HttpClient) { }

  getAllUsers() {
    return this._http.get("https://localhost:7132/api/Ammar/getAllUsers");

  }
  /////////////////////////////////////////////////////////////////////////////
  getAllChefs() {
    return this._http.get("https://localhost:7132/api/Ammar/getAllChefs");
  }

  addChef(data: any) {
    return this._http.post("https://localhost:7132/api/Ammar/addChef", data);
  }

  editChef(id: number, data: any) {
    return this._http.put(`https://localhost:7132/api/Ammar/editChef/${id}`, data);
  }

  deleteChef(id: number) {
    return this._http.delete(`https://localhost:7132/api/Ammar/deleteChef/${id}`);
  }
  /////////////////////////////////////////////////////////////////////////////////
  getallFood() {
    return this._http.get("https://localhost:7132/api/Ammar/getAllFood");
  }

  addFood(data: any) {
    return this._http.post("https://localhost:7132/api/Ammar/addFood", data);
  }

  editFood(id: number, data: any) {
    return this._http.put(`https://localhost:7132/api/Ammar/editFood/${id}`, data);
  }

  deleteFood(id: number) {
    return this._http.delete(`https://localhost:7132/api/Ammar/deleteFood/${id}`);
  }


}

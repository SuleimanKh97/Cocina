import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlserviceService {

  constructor(private _http: HttpClient) { }

  getAllUsers() {
    return this._http.get("https://localhost:7132/api/Ammar/GetAllUser");
  }
  /////////////////////////////////////////////////////////////////////////////
  getAllChefs() {
    return this._http.get("https://localhost:7132/api/Ammar/GetAllChef");
  }

  addChef(data: any) {
    return this._http.post("https://localhost:7132/api/Ammar/AddChef", data);
    
  }

  editChef(id: number, data: any) {
    return this._http.put(`https://localhost:7132/api/Ammar/EditChef/${id}`, data);
  }

  deleteChef(id: number) {
    return this._http.delete(`https://localhost:7132/api/Ammar/DeleteChef/${id}`);
  }
  /////////////////////////////////////////////////////////////////////////////////
  getallFood() {
    return this._http.get("https://localhost:7132/api/Ammar/GetAllFood");
  }

  addFood(data: any) {
    return this._http.post("https://localhost:7132/api/Ammar/AddFood", data);
  }

  editFood(id: number, data: any) {
    return this._http.put(`https://localhost:7132/api/Ammar/EditFood/${id}`, data);
  }

  deleteFood(id: number) {
    return this._http.delete(`https://localhost:7132/api/Ammar/DeleteFood/${id}`);
  }


  ///////////////////////////////////////////////////////////////////////////////


  getallcategory() {
    return this._http.get("https://localhost:7132/api/Ammar/GetAllCategory");
  }

  addCategory(data: any) {
    return this._http.post("https://localhost:7132/api/Ammar/AddCategory", data);
  }

  editCategory(id: number, data: any) {
    return this._http.put(`https://localhost:7132/api/Ammar/EditCategory/${id}`, data);
  }
  deleteCategory(id: number) {
    return this._http.delete(`https://localhost:7132/api/Ammar/DeleteCategory/${id}`);
  }


}

//import { HttpClient } from '@angular/common/http';
//import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})
//export class URLService {

//  constructor(private _http: HttpClient) { }

//  addBook(data: any) {
//    return this._http.post("https://localhost:7132/api/Sajeda/CreateBook", data);
//  }

//  getAllChefs(){
//    return this._http.get("https://localhost:7132/api/Sajeda/getChiefs");
//  }

//  getAllFoods(chefId: number, categoryId: number) {
//    return this._http.get(`https://localhost:7132/api/Sajeda/getfood/${chefId}/${categoryId}`);
//  }

//  getAllServices(){
//    return this._http.get("https://localhost:7132/api/Sajeda/getService");
//  }

//  addToCheck(data: any) {
//    return this._http.post("https://localhost:7132/api/Sajeda/Pay", data);
//  }

//  getAvailability(chefId: number, date: string) {
//    //return this._http.get(`/api/chef/${chefId}/availability?bookingDate=${date}`);
//    return this._http.get(`https://localhost:7132/api/Sajeda/${chefId}/availability/${date}`);
//  }
//}




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  constructor(private _http: HttpClient) { }

  //addBook(data: any) {
  //  return this._http.post("https://localhost:7132/api/Sajeda/CreateBook", data);
  //}

  addBook(data: any) {
    return this._http.post("https://localhost:7132/api/Sajeda/CreateBook", data);
  }

  getAllChefs() {
    return this._http.get("https://localhost:7132/api/Sajeda/getChiefs");
  }

  //getAllFoods(chefId: number, categoryId: number) {
  //  return this._http.get(`https://localhost:7132/api/Sajeda/getfood?chefId=${chefId}&categoryId=${categoryId}`);
  //  //https://localhost:7132/api/Sajeda/getfood?chefId=2&categoryId=2
  //}
  getAllFoods(chefId: number, categoryId: number): Observable<any> {
    return this._http.get<any>(`https://localhost:7132/api/Sajeda/getfood?chefId=${chefId}&categoryId=${categoryId}`);
  }


  getAllCategorires() {
    return this._http.get("https://localhost:7132/api/Sajeda/getCategories");
  }

  getAllServices() {
    return this._http.get("https://localhost:7132/api/Sajeda/getService");
  }
  getServicebyCheifID(chefId: number) {
    return this._http.get(`https://localhost:7132/api/Sajeda/getService${chefId}`);
  }
  addToCheck(data: any) {
    return this._http.post("https://localhost:7132/api/Sajeda/Pay", data.response);
  }
  getAvailability(chefId: number, date: string) {
    //return this._http.get(`/api/chef/${chefId}/availability?bookingDate=${date}`);
    return this._http.get(`https://localhost:7132/api/Sajeda/${chefId}/availability?bookingDate=${date}`);

  }

  private bookingData: any;

  setBookingData(data: any) {
    this.bookingData = data;
  }

  getBookingData() {
    return this.bookingData;
  }


}


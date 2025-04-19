import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLService {

  constructor(private _http: HttpClient) { }

  addBook(data: any) {
    return this._http.post("https://localhost:7132/api/Sajeda/CreateBook", data);
  }

  getAllChefs(){
    return this._http.get("https://localhost:7132/api/Sajeda/getChiefs");
  }

  getAllFoods(chefId: number, categoryId: number) {
    return this._http.get(`https://localhost:7132/api/Sajeda/getfood/${chefId}/${categoryId}`);
  }

  getAllServices(){
    return this._http.get("https://localhost:7132/api/Sajeda/getService");
  }


}

import { Component } from '@angular/core';
import { URLService } from '../url.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private _url: URLService) { }

  ngOnInit() {

  }


  addToPay(data: any) {
    this._url.addToCheck(data).subscribe(() => {
      alert("added");
    });
  }
}

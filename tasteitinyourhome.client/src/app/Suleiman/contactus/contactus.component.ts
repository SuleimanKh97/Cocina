import { Component } from '@angular/core';
import { HomeService } from '../Services/home.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  standalone: false,
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  constructor(private _ser: HomeService, private router: Router) { }

  ngOnInit() {

  }

  postContact(contact: any) {
    this._ser.handelcontactusRequst(contact).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'We Will Contact you as Soon as Possible',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.router.navigate(['']);
      });
    })
  }

}

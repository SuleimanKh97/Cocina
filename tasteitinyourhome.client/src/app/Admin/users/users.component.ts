import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UrlserviceService } from '../../Ammar/urlservice.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  constructor(private TheService: UrlserviceService) { }

  ngOnInit() {
    this.getAllUsers();

  }

  alluser: any
  getAllUsers() {

    this.TheService.getAllUsers().subscribe((data) => {
      this.alluser = data;
    

    })
  }





}

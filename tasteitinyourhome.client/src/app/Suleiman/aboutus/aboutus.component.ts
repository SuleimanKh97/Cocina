import { Component } from '@angular/core';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'app-aboutus',
  standalone: false,
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  teamMembers: TeamMember[] = [
    {
      name: 'Sajeda Ramzi Ahmad Khasawneh',
      position: 'Founder & CEO',
      bio: 'Passionate culinary expert with over 10 years of experience in fine dining and hospitality. Sajeda founded Chef Night with the vision of bringing restaurant-quality dining to homes.',
      image: 'assets/images/team/team1.jpg'
    },
    {
      name: 'Suleiman Mustafa Suleiman Khashashneh',
      position: 'Executive Chef',
      bio: 'Award-winning chef with expertise in multiple cuisines. Suleiman leads our chef team, ensuring each menu is crafted to perfection and every dining experience is exceptional.',
      image: 'assets/images/team/team2.jpg'
    },
    {
      name: 'Ammar Waheed Ahmad Alomari',
      position: 'Operations Manager',
      bio: 'With a background in hospitality management, Ammar ensures smooth operations and coordinates between clients and chefs to create seamless dining experiences.',
      image: 'assets/images/team/team3.jpg'
    },
    {
      name: 'Sally Marwan Mohammad Alzu\'bi',
      position: 'Customer Relations',
      bio: 'Sally is dedicated to ensuring customer satisfaction, handling special requests and managing feedback to continuously improve our services.',
      image: 'assets/images/team/team4.jpg'
    },
    {
      name: 'Sondos Mohammed Abdel Wahab Athamneh',
      position: 'Marketing Director',
      bio: 'Sondos brings creative marketing strategies to connect food lovers with exceptional in-home dining experiences. She leads our digital presence and brand messaging.',
      image: 'assets/images/team/team5.jpg'
    },
    {
      name: 'Sara Yousef Ahmoud Alharahsheh',
      position: 'Chef Recruiter',
      bio: 'Sara identifies and onboards talented chefs, ensuring our team consists of only the most skilled and passionate culinary artists.',
      image: 'assets/images/team/team6.jpg'
    },
    {
      name: 'Sofyan Yousef Oqlah Njadat',
      position: 'Finance Manager',
      bio: 'Sofyan manages the financial aspects of the business, ensuring we deliver premium culinary experiences while maintaining excellent value for our customers.',
      image: 'assets/images/team/team7.jpg'
    }
  ];

  // Map location coordinates
  mapLocation = {
    lat: 31.963158, // Set these to your actual coordinates
    lng: 35.930359,
    zoom: 15
  };
}

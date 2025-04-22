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
      name: 'Sajeda Khasawneh',
      position: 'Founder & CEO',
      bio: 'Passionate culinary expert with over 10 years of experience in fine dining and hospitality. Sajeda founded Chef Night with the vision of bringing restaurant-quality dining to homes.',
      image: 'https://img.freepik.com/psd-premium/avatar-de-personagem-de-desenho-animado-feminino-3d-isolado-em-renderizacao-3d_235528-942.jpg'
    },
    {
      name: 'Suleiman Khashashneh',
      position: 'Executive Chef',
      bio: 'Award-winning chef with expertise in multiple cuisines. Suleiman leads our chef team, ensuring each menu is crafted to perfection and every dining experience is exceptional.',
      image: 'https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6834.jpg?semt=ais_hybrid&w=740'
    },
    {
      name: 'Ammar Alomari',
      position: 'Operations Manager',
      bio: 'With a background in hospitality management, Ammar ensures smooth operations and coordinates between clients and chefs to create seamless dining experiences.',
      image: 'https://img.freepik.com/fotos-premium/memoji-gutaussehender-mann-mit-brille-auf-weissem-hintergrund-emoji-zeichentrickfigur_826801-6961.jpg'
    },
    {
      name: 'Sally Al Zu\'bi',
      position: 'Customer Relations',
      bio: 'Sally is dedicated to ensuring customer satisfaction, handling special requests and managing feedback to continuously improve our services.',
      image: 'https://img.freepik.com/psd-premium/avatar-de-personagem-de-desenho-animado-feminino-3d-isolado-em-renderizacao-3d_235528-988.jpg'
    },
    {
      name: 'Sondos Athamneh',
      position: 'Marketing Director',
      bio: 'Sondos brings creative marketing strategies to connect food lovers with exceptional in-home dining experiences. She leads our digital presence and brand messaging.',
      image: 'https://img.freepik.com/psd-premium/avatar-de-personagem-de-desenho-animado-feminino-3d-isolado-em-renderizacao-3d_235528-954.jpg?w=360'
    },
    {
      name: 'Sara Al Harahsheh',
      position: 'Chef Recruiter',
      bio: 'Sara identifies and onboards talented chefs, ensuring our team consists of only the most skilled and passionate culinary artists.',
      image: 'https://img.freepik.com/psd-premium/avatar-de-personagem-de-desenho-animado-de-garcom-3d-isolado-em-renderizacao-3d_235528-1017.jpg'
    },
    {
      name: 'Sofyan Njadat',
      position: 'Finance Manager',
      bio: 'Sofyan manages the financial aspects of the business, ensuring we deliver premium culinary experiences while maintaining excellent value for our customers.',
      image: 'https://img.freepik.com/photos-premium/image-stock-haute-qualite_783884-150679.jpg'
    }
  ];

  // Map location coordinates
  mapLocation = {
    lat: 31.963158, // Set these to your actual coordinates
    lng: 35.930359,
    zoom: 15
  };
}

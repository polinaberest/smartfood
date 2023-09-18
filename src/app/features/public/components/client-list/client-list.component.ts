import { Component } from '@angular/core';
import { Organization } from 'src/app/features/client/models/company.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  clients = [
    {
      name: 'Infinity Solutions',
      description: 'A cutting-edge IT company, dedicated to providing solutions that empower businesses. Specializes in IT consulting, software development, and more, guiding its clients toward limitless technological possibilities',
      registerDate: new Date(),
      img: 'assets/logos/solutions.png'
    },
    {
      name: 'Ukrainian Vitory Strategies',
      description: 'A consulting firm known for its expertise in guiding military tech companiest to success in the Ukrainian market. With a deep understanding of local dynamics and a track record of delivering winning strategies, the company is a trusted partner for achieving growth and prosperity.',
      registerDate: new Date(),
      img: 'assets/logos/ua.png'
    },
    {
      name: 'Wow Team',
      description: 'The designer reative agency renowned for its innovative design solutions. The team specializes in crafting visually stunning and impactful designs that captivate audiences and leave a lasting impression.',
      registerDate: new Date(),
      img: 'assets/logos/wow.png'
    },
    {
      name: 'KHelper Community',
      description: 'Volunteer project for fast volunteer help delivery in Kharkiv, Ukraine, that is aimed to help the soldiers on the frontline, the defence forces in the city, the injured defenders in hospitals and the citizens, that need support.',
      registerDate: new Date('22-08-2023'),
      img: 'assets/logos/khelper.png'
    }
  ];
}

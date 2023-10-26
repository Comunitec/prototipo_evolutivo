import { Component } from '@angular/core';
import{faHouse, faBookOpen, faUsers,faBell, faRankingStar, faDoorOpen} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  faHouse = faHouse;
  faBookOpen = faBookOpen;
  faRankingStar = faRankingStar;
  faBell = faBell;
  faUsers = faUsers;
  faDoorOpen = faDoorOpen;
}

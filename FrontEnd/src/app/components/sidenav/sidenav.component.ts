import { Component } from '@angular/core';
import{faHouse, faBookOpen, faUsers,faBell, faRankingStar, faDoorOpen, faUser,faFile} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  faHouse = faHouse;
  faUser =faUser;
  faBookOpen = faBookOpen;
  faRankingStar = faRankingStar;
  faBell = faBell;
  faUsers = faUsers;
  faDoorOpen = faDoorOpen;
  faFile = faFile
}

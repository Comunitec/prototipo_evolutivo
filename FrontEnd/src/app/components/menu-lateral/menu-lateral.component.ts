import { Component } from '@angular/core';
import{faHouse, faBookOpen, faUsers,faBell, faRankingStar, faDoorOpen, faUser,faFile} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  faHouse = faHouse;
  faUser =faUser;
  faBookOpen = faBookOpen;
  faRankingStar = faRankingStar;
  faBell = faBell;
  faUsers = faUsers;
  faDoorOpen = faDoorOpen;
  faFile = faFile
}

import { Component } from '@angular/core';
import{faHouse, faBookOpen, faRankingStar, faDoorOpen, faUser, faChalkboardTeacher, faUserGraduate, faThumbsUp, faTrophy, faChevronRight, faChevronDown} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  faHouse = faHouse;
  faUser = faUser;
  faBookOpen = faBookOpen;
  faTrophy = faTrophy;
  faDoorOpen = faDoorOpen;
  faChalkboardTeacher= faChalkboardTeacher;
  faUserGraduate = faUserGraduate;
  faThumbsUp = faThumbsUp;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  submenusVisible: boolean = false;

  submenuOpen: boolean = false;

  toggleSubmenus() {
    this.submenuOpen = !this.submenuOpen;
  }

}

import { Component } from '@angular/core';
import{faHouse, faBookOpen, faDoorOpen, faUser, faChalkboardTeacher, faBookOpenReader, faThumbsUp, faTrophy, faChevronRight, faChevronDown, faUserTie} from '@fortawesome/free-solid-svg-icons'

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
  faBookOpenReader = faBookOpenReader;
  faThumbsUp = faThumbsUp;
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  faUserTie = faUserTie;

  submenusVisible: boolean = false;


  submenuOpen: boolean = false;

  toggleSubmenus() {
    this.submenuOpen = !this.submenuOpen;
  }

}

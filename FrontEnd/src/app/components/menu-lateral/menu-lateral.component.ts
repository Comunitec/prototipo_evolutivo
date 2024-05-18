import { Component } from '@angular/core';
import{faHouse, faBookOpen, faRankingStar, faDoorOpen, faUser, faChalkboardTeacher, faUserGraduate, faThumbsUp} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {
  faHouse = faHouse;
  faUser = faUser;
  faBookOpen = faBookOpen;
  faRankingStar = faRankingStar;
  faDoorOpen = faDoorOpen;
  faChalkboardTeacher= faChalkboardTeacher;
  faUserGraduate = faUserGraduate;
  faThumbsUp = faThumbsUp;

  submenusVisible: boolean = false;

  toggleSubmenus() {
    this.submenusVisible = !this.submenusVisible;
  }
}

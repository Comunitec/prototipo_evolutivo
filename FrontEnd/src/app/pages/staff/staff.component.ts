import { Component } from '@angular/core';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  faThumbsUp = faThumbsUp;

}

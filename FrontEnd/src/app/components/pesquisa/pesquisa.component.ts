import { Component } from '@angular/core';
import{faSearch, faEraser} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
  faSearch = faSearch;
  faEraser = faEraser;
}

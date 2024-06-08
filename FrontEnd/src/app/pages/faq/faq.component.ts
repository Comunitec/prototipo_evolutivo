import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  podeVerMenuLateral: boolean = false;

  ngOnInit() {
    this.carregarMenuLateral();
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('idAluno');
  }

  carregarMenuLateral(){
    if (this.isLoggedIn()) {
      this.podeVerMenuLateral = true;
    }
  }

}

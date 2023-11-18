/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent {

}

*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent implements OnInit{
[x: string]: any;
 
  public listteste: Array<{ nomeCurso: string , imgCurso: string, tagCurso: string[]}>= 
  [{nomeCurso: "CSS",
   imgCurso: "css_image",
    tagCurso: ['divs','flex-box', 'recursividade'] },
  { nomeCurso: "JS",
   imgCurso: "js_image",
   tagCurso: ['propriedades','objects', 'Funções'] },
  { nomeCurso: "HTML",
   imgCurso: "html_image",
   tagCurso: ['tags','metadados', 'Links', 'Imagens'] }
  ];

  Constructor() {
    /*comentario*/
  }

  ngOnInit(): void{
 /*comentario*/
  }
}

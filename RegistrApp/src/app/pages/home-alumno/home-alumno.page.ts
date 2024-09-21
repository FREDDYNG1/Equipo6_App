import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {

  menuOptions = [
    { titulo: 'Inicio', 
      url: '/inicio', 
      icon: 'home' 
    },
    { titulo: 'Perfil', 
      url: '/perfil', 
      icon: 'person-outline' 
    },
    { titulo: 'Cerrar Sesión', 
      url: '/logout', 
      icon: 'log-out-outline' 
    }
  ];
  

  constructor(private router: Router) {} 

  ngOnInit() {
  }

  cerrarSesion() {
    localStorage.removeItem('usuario'); // Limpia los datos de sesión
    this.router.navigate(['/inicio-app']); // Redirige a la página de inicio de sesión
  }
}

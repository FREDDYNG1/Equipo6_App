import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar el servicio Router

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {
  

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

  constructor(private router: Router) {} // Inyectar el servicio Router

  ngOnInit() {}

  cerrarSesion() {
    localStorage.removeItem('usuario'); // Limpia los datos de sesión
    this.router.navigate(['/inicio-app']); // Redirige a la página de inicio de sesión
  }

}

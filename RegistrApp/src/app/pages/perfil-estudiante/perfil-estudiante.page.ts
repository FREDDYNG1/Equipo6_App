import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
})
export class PerfilEstudiantePage implements OnInit {

  user = {
    name: 'Juan Pérez',
    institution: 'Universidad de Chile',
    career: 'Ingeniería en Informática',
    profilePicture: 'assets/images/profile-placeholder.webp', // Ruta a la imagen de perfil
  };

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  editProfile() {
    // Lógica para editar el perfil
    console.log('Editar perfil');
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
  }
}


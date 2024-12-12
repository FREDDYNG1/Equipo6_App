import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-app',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home-docente',
    loadChildren: () => import('./pages/home-docente/home-docente.module').then(m => m.HomeDocentePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./pages/home-alumno/home-alumno.module').then(m => m.HomeAlumnoPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'inicio-app',
    loadChildren: () => import('./pages/inicio-app/inicio-app.module').then(m => m.InicioAppPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/generar-qr/generar-qr.module').then(m => m.GenerarQrPageModule),

  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then(m => m.CamaraPageModule)
  },
  {
    path: 'perfil-estudiante',
    loadChildren: () => import('./pages/perfil-estudiante/perfil-estudiante.module').then( m => m.PerfilEstudiantePageModule)
  },
  {
    path: 'visualizar-clase',
    loadChildren: () => import('./pages/visualizar-clase/visualizar-clase.module').then( m => m.VisualizarClasePageModule)
  },
  {
    path: '**',
    redirectTo: 'inicio-app'
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

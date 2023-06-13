import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private loginService: LoginService) {}

  get isAuthenticated(): boolean {
    let authStatus = false;
    this.loginService.estaAutenticado.subscribe(status => {
      authStatus = status;
    });
    return authStatus;
  }

  get username(): string {
    // Obtiene el nombre de usuario autenticado
    return this.loginService.usuarioAutenticado.nombre;
  }

  logout() {
    // Llama al método logout del servicio de login para cerrar la sesión
    this.loginService.logout();
  }
}

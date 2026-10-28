import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { SideMenu } from '../../components/side-menu/side-menu';

@Component({
  selector: 'app-dashboard',
  // Asegúrate de incluir SideMenu aquí
  imports: [RouterOutlet, SideMenu], 
  templateUrl: './dashboard-page.html',
})
export default class DashboardPage {
  
  // 1. Inyectamos el router
  private router = inject(Router);

  // 2. Signal para controlar si el menú móvil está abierto o cerrado
  isMenuOpen = signal(false);

  constructor() {
    // 3. Toque profesional: Si estamos en móvil y navegamos, cerramos el menú automáticamente
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isMenuOpen.set(false);
    });
  }

  // Método para alternar el menú
  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

}
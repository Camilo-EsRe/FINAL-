// src/app/app.component.ts
import { Component } from '@angular/core';

/**
 * @Component es un decorador que marca una clase como un componente Angular
 * y proporciona metadatos de configuración.
 */
@Component({
  // 'selector' define el nombre de la etiqueta HTML que se usará para este componente.
  // Por ejemplo, para usar este componente en un template, usarías <app-root></app-root>.
  selector: 'app-root',
  
  // 'templateUrl' especifica la ruta al archivo HTML de la plantilla de este componente.
  // Aquí se define la estructura visual del componente.
  templateUrl: './app.html',
  
  // 'styleUrls' especifica un array de rutas a los archivos CSS de estilo de este componente.
  // Aquí se define la apariencia visual del componente.
  styleUrls: ['./app.css']
})
/**
 * La clase AppComponent es el componente raíz de la aplicación.
 * Es la entrada principal para la mayoría de las aplicaciones Angular.
 * La palabra clave 'export' es crucial para que este componente pueda ser importado
 * y declarado en el AppModule.
 */
export class AppComponent {
  // 'title' es una propiedad que puede ser usada en el template (app.component.html).
  // Es un ejemplo simple para demostrar el data binding.
  title = 'Gestor de Contactos'; // Puedes cambiar esto al nombre de tu aplicación
}

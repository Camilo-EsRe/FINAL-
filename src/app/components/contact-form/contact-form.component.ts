// src/app/components/contact-form/contact-form.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit { // <-- ¡Asegúrate de que 'export' esté aquí!

  constructor() { }

  ngOnInit(): void {
    // ...
  }
}
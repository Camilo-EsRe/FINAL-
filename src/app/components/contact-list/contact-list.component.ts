// src/app/components/contact-list/contact-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.loading = true;
    this.errorMessage = '';
    this.contactService.getContacts().subscribe({
      next: (data: Contact[]) => {
        this.contacts = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.error.msg || 'Error al cargar los contactos.';
        this.loading = false;
        console.error('Error fetching contacts:', err);
        // Si el error es de autenticación, podrías redirigir al login
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  editContact(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/contacts/edit', id]);
    } else {
      console.warn('Cannot edit contact: ID is undefined.');
    }
  }

  deleteContact(id: string | undefined): void {
    if (!id) {
      console.warn('Cannot delete contact: ID is undefined.');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(contact => contact._id !== id);
          alert('Contacto eliminado exitosamente.');
        },
        error: (err: any) => {
          this.errorMessage = err.error.msg || 'Error al eliminar el contacto.';
          console.error('Error deleting contact:', err);
        }
      });
    }
  }
}
export interface Contact {
  _id?: string; // MongoDB ID
  nombre: string;
  apellido?: string;
  telefonoFijo?: string;
  celular: string;
  email?: string;
  date?: Date;
}
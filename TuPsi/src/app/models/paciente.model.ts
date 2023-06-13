export interface Paciente {
    id?: number;
    dni: number;
    nombre: string;
    apellido: string;
    sexo: string;
    telefono: number;
    id_terapia_id: number;
    email: string; 
    password: string;
    provincia_id: number;
    localidad: string;
    suscripcion?: boolean;
    plan?: string;
    editando?: boolean; // Propiedad editando opcional
    token?: string;
  }
  
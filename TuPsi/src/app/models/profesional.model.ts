export interface Profesional {
    id?: number,
    nombre: string,
    apellido: string,
    sexo: string,
    telefono: number,
    tipo_de_terapia: string, 
    email: string,
    clave:string,
    provincia: string,
    localidad: string,
    numero_matricula: number,
    editando?: boolean; // Propiedad editando opcional
}
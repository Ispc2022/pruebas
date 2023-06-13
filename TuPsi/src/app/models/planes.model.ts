export interface Plan {
    id?: number,
    nombre: string,
    descripcion: string,
    precio: number,
    editando?: boolean; // Propiedad editando opcional
}
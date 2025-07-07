export function getStatusText(status: number) {
    console.log('Status is: ', status);
    switch (status) {
        case 0: return "Disponible";
        case 1: return "En proceso de adopción";
        case 2: return "Adoptado";
        case 3: return "Fallecido";
        default: return "Desconocido";
    }
}
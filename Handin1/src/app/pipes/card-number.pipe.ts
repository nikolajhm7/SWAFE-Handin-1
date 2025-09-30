import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cardNumber',
    standalone: true
})
export class CardNumberPipe implements PipeTransform {
    transform(value: number | string): string {
        return String(value)
            .replace(/\D/g, '')                 // Fjern ikke-numeriske tegn
            .replace(/(\d{4})(?=\d)/g, '$1-');  // Space hvert 4 nummer
    }
}
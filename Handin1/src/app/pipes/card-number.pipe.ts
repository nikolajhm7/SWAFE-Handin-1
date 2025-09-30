import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'cardNumber',
    standalone: true
})
export class CardNumberPipe implements PipeTransform {
    transform(value: number | string): string {
        return String(value)
            .replace(/\D/g, '')                 // Remove non-digit characters
            .replace(/(\d{4})(?=\d)/g, '$1-');  // Insert space every 4 digits
    }
}
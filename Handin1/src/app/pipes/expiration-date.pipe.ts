import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'expirationDate',
    standalone: true
})
export class ExpirationDatePipe implements PipeTransform {
    transform(
        month: number | string,
        year: number | string,
        fourDigitYear: boolean = false,
        separator: string = '/'
    ): string {
        const m = this.num(month);
        const y = this.num(year);

        if (!m || !y) {
            return '';
        }

        const mm = String(Math.min(Math.max(m, 1), 12)).padStart(2, '0'); // Clamp month between 1 and 12

        let yy: string;
        if (fourDigitYear) {
            const full = y < 100 ? 2000 + y : y; // Convert to four-digit year if needed
            yy = String(full);
        } else {
            yy = String(y % 100).padStart(2, '0');
        }

        return `${mm}${separator}${yy}`;
    }

    private num(v: unknown): number{
        const number = parseInt(String(v ?? '').replace(/\D/g, ''), 10);
        return Number.isFinite(number) ? number : NaN;
    }
}
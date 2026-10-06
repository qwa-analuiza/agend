import { Injectable } from '@angular/core';

export type BookingStatus = 'Pendente' | 'Confirmado';

export interface BookingEntry {
  dia: string;
  procedimento: string;
  horario: string;
  observacoes: string;
  status?: BookingStatus;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly storageKey = 'camila-nail-studio-bookings';

  addBooking(entry: BookingEntry): void {
    const existing = this.getBookings();
    existing.push(entry);
    localStorage.setItem(this.storageKey, JSON.stringify(existing));
  }

  getBookings(): BookingEntry[] {
    const raw = localStorage.getItem(this.storageKey);

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as BookingEntry[];
    } catch {
      return [];
    }
  }
}

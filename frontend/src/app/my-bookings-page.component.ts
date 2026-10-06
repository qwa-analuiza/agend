import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BookingEntry, BookingService } from './booking.service';

@Component({
  selector: 'app-my-bookings-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="my-bookings-page">
      <div class="page-shell">
        <button class="back-link" type="button" (click)="goToBooking()">← Voltar</button>

        <div class="section-kicker">SUA ÁREA</div>
        <div class="page-top">
          <h1>Meus agendamentos</h1>
          <button class="gold-button" type="button" (click)="goToBooking()">Novo <span>→</span></button>
        </div>

        <p class="greeting">Olá, ana!</p>
        <div class="section-subtitle">PRÓXIMOS HORÁRIOS</div>

        <div *ngIf="bookings.length === 0" class="empty-state">
          <h3>Nenhum agendamento por enquanto</h3>
          <p>Você ainda não reservou nenhum horário.</p>
          <button class="gold-button large" type="button" (click)="goToBooking()">Agendar agora</button>
        </div>

        <div *ngIf="bookings.length > 0" class="booking-list">
          <article class="booking-card" *ngFor="let booking of bookings">
            <div class="booking-main">
              <div class="service-icon">✦</div>
              <div class="service-text">
                <h3>{{ booking.procedimento }}</h3>
                <div class="service-meta">{{ booking.horario }} · {{ booking.procedimento === 'Nail Art' ? '90 min' : '50 min' }}</div>
              </div>
              <span class="status-pill" [class.pending]="booking.status !== 'Confirmado'" [class.confirmed]="booking.status === 'Confirmado'">
                {{ booking.status || 'Aguardando aprovação' }}
              </span>
            </div>

            <div class="booking-info">
              <div class="info-row">
                <span class="info-icon">📅</span>
                <span>{{ booking.dia }}</span>
              </div>
              <div class="info-row">
                <span class="info-icon">◔</span>
                <span>{{ booking.horario }}</span>
              </div>
            </div>

            <button class="cancel-link" type="button">Cancelar solicitação</button>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      * { box-sizing: border-box; }
      :host { display: block; }
      .my-bookings-page {
        min-height: calc(100vh - 40px);
        padding: 42px 24px 80px;
        background: #f3efe9;
        color: #241d1a;
      }
      .page-shell {
        width: min(1120px, 100%);
        margin: 0 auto;
      }
      .back-link {
        border: none;
        background: transparent;
        color: #1f1714;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 20px;
      }
      .section-kicker,
      .section-subtitle {
        color: #735e4d;
        font-size: 0.8rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        margin-bottom: 12px;
      }
      .page-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 12px;
      }
      .page-top h1 {
        margin: 0;
        font-size: clamp(2.2rem, 4vw, 4rem);
        font-weight: 700;
        letter-spacing: -0.05em;
      }
      .gold-button {
        border: none;
        border-radius: 999px;
        background: linear-gradient(135deg, #d2b37d, #b8905e);
        color: #fff;
        font-weight: 700;
        font-size: 1rem;
        padding: 14px 26px;
        cursor: pointer;
        box-shadow: 0 10px 20px rgba(154,117,74,0.18);
      }
      .gold-button span { margin-left: 8px; }
      .gold-button.large { padding: 16px 36px; }
      .greeting {
        margin: 0 0 18px;
        font-size: 1.3rem;
        color: #372d2a;
      }
      .booking-list {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .booking-card {
        background: rgba(255,255,255,0.55);
        border: 1px solid rgba(138,110,87,0.24);
        border-radius: 20px;
        padding: 18px 20px;
        box-shadow: 0 10px 24px rgba(43,27,20,0.04);
      }
      .booking-main {
        display: grid;
        grid-template-columns: 52px minmax(0, 1fr) auto;
        align-items: center;
        gap: 16px;
      }
      .service-icon {
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: rgba(223,206,184,0.8);
        display: grid;
        place-items: center;
        color: #5e4338;
      }
      .service-text h3 {
        margin: 0 0 6px;
        font-size: clamp(1.2rem, 2vw, 2rem);
        font-weight: 600;
        letter-spacing: -0.04em;
      }
      .service-meta {
        color: #695950;
        font-size: 0.9rem;
        font-weight: 500;
      }
      .status-pill {
        justify-self: end;
        border-radius: 999px;
        padding: 7px 12px;
        font-size: 0.8rem;
        font-weight: 700;
      }
      .status-pill.pending {
        background: rgba(195,163,116,0.2);
        color: #8a6a3b;
      }
      .status-pill.confirmed {
        background: rgba(70,141,93,0.15);
        color: #2d6a42;
      }
      .booking-info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 14px;
        margin-top: 18px;
        padding-top: 14px;
        border-top: 1px solid rgba(138,110,87,0.2);
        color: #473d38;
      }
      .info-row {
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .info-icon {
        display: inline-grid;
        place-items: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(223,206,184,0.8);
      }
      .cancel-link {
        margin-top: 14px;
        border: none;
        background: transparent;
        color: #4d403b;
        font-size: 0.94rem;
        cursor: pointer;
      }
      .empty-state {
        background: rgba(255,255,255,0.5);
        border: 1px solid rgba(138,110,87,0.2);
        border-radius: 20px;
        padding: 26px 18px;
        text-align: center;
      }
      .empty-state h3 {
        margin: 0 0 8px;
        font-size: 1.7rem;
      }
      .empty-state p {
        margin: 0 0 18px;
        color: #6b584d;
      }
      @media (max-width: 620px) {
        .my-bookings-page {
          padding-left: 16px;
          padding-right: 16px;
        }
        .page-top {
          flex-direction: column;
          align-items: flex-start;
        }
        .booking-main {
          grid-template-columns: 42px minmax(0, 1fr);
        }
        .status-pill {
          grid-column: 2;
          justify-self: start;
        }
      }
    `
  ]
})
export class MyBookingsPageComponent {
  bookings: BookingEntry[] = [];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly bookingService: BookingService,
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return;
    }

    this.bookings = this.bookingService.getBookings();
  }

  goToBooking(): void {
    this.router.navigateByUrl('/agendamento');
  }
}

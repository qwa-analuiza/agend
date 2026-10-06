import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BookingEntry, BookingService } from './booking.service';

type ServiceCategory = 'Todos' | 'Manicure' | 'Pedicure' | 'Nail art';

interface ServiceOption {
  categoria: string;
  nome: string;
  descricao: string;
  preco: string;
  duracao: string;
  imagem: string;
  icone: string;
}

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="booking-page">
      <div class="booking-shell">
        <aside class="profile-panel">
          <div class="profile-photo-wrap">
            <img [src]="camilaPhoto" alt="Camila Nail Studio">
            <div class="profile-name">
              <h2>Camila</h2>
              <span>Nail artist • atendimento exclusivo</span>
            </div>
          </div>

          <div class="step-progress" aria-label="Etapas do agendamento">
            <span [class.active]="step >= 1"></span>
            <span [class.active]="step >= 2"></span>
            <span [class.active]="step >= 3"></span>
          </div>

          <div class="step-caption">Etapa {{ step }} de 3 · {{ stepTitles[step - 1] }}</div>
        </aside>

        <main class="booking-panel">
          <header class="panel-header">
            <button class="icon-button" type="button" (click)="prevStep()" aria-label="Voltar">←</button>
            <h3>{{ stepTitles[step - 1] }}</h3>
            <button class="icon-button calm" type="button" (click)="abrirMeusAgendamentos()" aria-label="Meus agendamentos">
              🗓
            </button>
          </header>

          <div *ngIf="step === 1" class="wizard-step">
            <div class="filter-row">
              <button
                *ngFor="let filter of filters"
                type="button"
                class="filter-pill"
                [class.active]="selectedCategory === filter"
                (click)="selectedCategory = filter"
              >
                {{ filter }}
              </button>
            </div>

            <div class="service-list">
              <button
                *ngFor="let item of filteredServices"
                type="button"
                class="service-card"
                [class.selected]="selectedService === item.nome"
                (click)="selectedService = item.nome"
              >
                <div class="service-icon">{{ item.icone }}</div>
                <div class="service-details">
                  <div class="service-row">
                    <h4>{{ item.nome }}</h4>
                    <strong>{{ item.preco }}</strong>
                  </div>
                  <div class="service-row lower">
                    <span>{{ item.duracao }}</span>
                    <small>{{ item.descricao }}</small>
                  </div>
                </div>
              </button>
            </div>

            <button class="primary-button" type="button" [disabled]="!selectedService" (click)="nextStep()">
              Escolher horário
            </button>
          </div>

          <div *ngIf="step === 2" class="wizard-step calendar-step">
            <div class="calendar-panel">
              <h4>{{ currentMonthLabel }}</h4>

              <div class="day-grid">
                <button
                  *ngFor="let day of monthDays"
                  type="button"
                  class="day-button"
                  [class.selected]="selectedDay === day.value"
                  [class.disabled]="day.disabled"
                  [disabled]="day.disabled"
                  (click)="selectDay(day)"
                >
                  <span>{{ day.label }}</span>
                  <strong>{{ day.day }}</strong>
                </button>
              </div>

              <div class="legend">
                <span><i class="dot neutral"></i> Disponível</span>
                <span><i class="dot selected"></i> Selecionado</span>
                <span><i class="dot busy"></i> Ocupado</span>
              </div>

              <div class="time-group">
                <div class="time-title">Manhã</div>
                <div class="time-grid">
                  <button
                    *ngFor="let slot of morningSlots"
                    type="button"
                    class="time-pill"
                    [class.selected]="selectedHour === slot"
                    (click)="selectedHour = slot"
                  >
                    {{ slot }}
                  </button>
                </div>
              </div>

              <div class="time-group">
                <div class="time-title">Tarde</div>
                <div class="time-grid">
                  <button
                    *ngFor="let slot of afternoonSlots"
                    type="button"
                    class="time-pill"
                    [class.selected]="selectedHour === slot"
                    (click)="selectedHour = slot"
                  >
                    {{ slot }}
                  </button>
                </div>
              </div>
            </div>

            <button class="primary-button" type="button" [disabled]="!selectedDay || !selectedHour" (click)="nextStep()">
              Continuar
            </button>
          </div>

          <div *ngIf="step === 3" class="wizard-step review-step">
            <div class="review-card">
              <div class="studio-banner">
                <div class="mini-avatar">
                  <img [src]="camilaPhoto" alt="Camila" />
                </div>
                <div class="studio-text">
                  <strong>Camila Nail Studio</strong>
                  <span>Nail artist • atendimento exclusivo</span>
                </div>
                <span class="spark">✦</span>
              </div>

              <div class="review-box">
                <div class="review-title-row">
                  <h4>{{ selectedServiceName }}</h4>
                  <span>{{ selectedServiceInfo?.duracao }}</span>
                </div>

                <div class="price-line">
                  <span>Valor</span>
                  <strong>{{ selectedServiceInfo?.preco }}</strong>
                </div>
              </div>

              <div class="detail-box">
                <div class="detail-row">
                  <span class="detail-icon">🗓</span>
                  <div>
                    <label>Data</label>
                    <strong>{{ selectedDateLabel }}</strong>
                  </div>
                </div>

                <div class="detail-row">
                  <span class="detail-icon">◔</span>
                  <div>
                    <label>Horário</label>
                    <strong>{{ selectedHour }}</strong>
                  </div>
                </div>

                <div class="detail-row">
                  <span class="detail-icon">◌</span>
                  <div>
                    <label>Cliente</label>
                    <strong>{{ currentClient }}</strong>
                  </div>
                </div>
              </div>

              <label class="accept-row">
                <input type="checkbox" [(ngModel)]="confirmCheck" />
                <span>Após confirmar, seu horário ficará aguardando a aprovação da Camila.</span>
              </label>
            </div>

            <button class="primary-button dark" type="button" [disabled]="!confirmCheck" (click)="confirmBooking()">
              Confirmar solicitação
            </button>
          </div>
        </main>
      </div>
    </section>
  `,
  styles: [
    `
      * { box-sizing: border-box; }
      :host { display: block; }
      button, input, textarea, select { font: inherit; }
      .booking-page {
        min-height: 100vh;
        padding: 80px 24px 40px;
        background: #f3efe9;
        color: #241d1a;
        font-family: 'Poppins', 'Segoe UI', sans-serif;
      }
      .booking-shell {
        width: min(1220px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
        gap: 32px;
        align-items: start;
      }
      .profile-panel {
        padding: 18px 18px 0;
      }
      .profile-photo-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 32px;
        background: #efe6dc;
        min-height: 420px;
        box-shadow: 0 16px 40px rgba(39, 27, 20, 0.08);
      }
      .profile-photo-wrap img {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 420px;
        object-fit: cover;
        object-position: center top;
      }
      .profile-name {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 18px 20px 16px;
        background: linear-gradient(180deg, rgba(18, 12, 10, 0), rgba(18, 12, 10, 0.7));
        color: #fff;
      }
      .profile-name h2 {
        margin: 0;
        font-size: clamp(2rem, 2vw, 2.5rem);
        font-weight: 700;
        letter-spacing: -0.04em;
      }
      .profile-name span {
        display: block;
        margin-top: 6px;
        font-size: 0.85rem;
        font-weight: 400;
        color: rgba(255,255,255,0.8);
      }
      .step-progress {
        display: flex;
        gap: 8px;
        margin-top: 16px;
        padding-top: 10px;
        border-top: 1px solid rgba(161, 126, 89, 0.5);
      }
      .step-progress span {
        display: block;
        flex: 1;
        height: 5px;
        border-radius: 999px;
        background: rgba(161,126,89,0.2);
      }
      .step-progress span.active {
        background: linear-gradient(90deg, #b58d5d, #a27345);
      }
      .step-caption {
        margin-top: 10px;
        color: #765f49;
        font-size: 0.83rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .booking-panel {
        background: rgba(255,255,255,0.4);
        border: 1px solid rgba(170,132,90,0.18);
        border-radius: 34px;
        padding: 20px 22px 22px;
        box-shadow: 0 14px 38px rgba(39,27,20,0.04);
      }
      .panel-header {
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        align-items: center;
        gap: 12px;
        margin-bottom: 18px;
      }
      .icon-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid rgba(35,25,18,0.15);
        background: #fff;
        color: #1d1715;
        font-size: 1.4rem;
        cursor: pointer;
      }
      .icon-button.calm {
        font-size: 1.25rem;
      }
      .panel-header h3 {
        margin: 0;
        text-align: center;
        font-size: clamp(2rem, 2vw, 2.6rem);
        font-weight: 600;
        letter-spacing: -0.04em;
      }
      .wizard-step {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }
      .filter-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .filter-pill {
        border: 1px solid rgba(94,75,62,0.35);
        border-radius: 999px;
        background: transparent;
        padding: 10px 18px;
        color: #352d2a;
        font-weight: 600;
        cursor: pointer;
      }
      .filter-pill.active {
        background: #2a201c;
        border-color: #2a201c;
        color: #fff;
      }
      .service-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .service-card {
        display: grid;
        grid-template-columns: 52px minmax(0, 1fr);
        gap: 16px;
        align-items: center;
        width: 100%;
        padding: 14px 16px;
        border: 1px solid rgba(134,110,87,0.28);
        border-radius: 20px;
        background: rgba(255,255,255,0.7);
        text-align: left;
        cursor: pointer;
      }
      .service-card.selected {
        border-color: rgba(168,129,89,0.5);
        box-shadow: 0 10px 26px rgba(56,40,31,0.05);
        background: #fff;
      }
      .service-icon {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: rgba(230,214,196,0.9);
        display: grid;
        place-items: center;
        font-size: 1.15rem;
        color: #5f483d;
      }
      .service-details {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .service-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .service-row h4 {
        margin: 0;
        font-size: clamp(1.3rem, 1.7vw, 1.8rem);
        font-weight: 600;
        letter-spacing: -0.03em;
      }
      .service-row strong {
        font-size: clamp(1.3rem, 1.5vw, 1.8rem);
        font-weight: 700;
        letter-spacing: -0.03em;
      }
      .service-row.lower {
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
      }
      .service-row.lower span {
        font-size: 0.8rem;
        color: #6b564c;
      }
      .service-row.lower small {
        display: block;
        color: #6b564c;
        font-size: 0.9rem;
        line-height: 1.5;
      }
      .primary-button {
        width: 100%;
        border: 0;
        border-radius: 18px;
        background: linear-gradient(180deg, #d0c9c3, #c3bcb5);
        color: #fff;
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        padding: 18px 20px;
        cursor: pointer;
        transition: opacity .2s ease, transform .2s ease;
      }
      .primary-button:not(:disabled):hover {
        transform: translateY(-1px);
      }
      .primary-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .primary-button.dark {
        background: linear-gradient(135deg, #2b201b, #1d1715);
      }
      .calendar-panel {
        background: rgba(255,255,255,0.2);
        border-radius: 20px;
        padding: 20px 18px 14px;
      }
      .calendar-panel h4 {
        margin: 0 0 18px;
        text-align: center;
        font-size: clamp(2rem, 2vw, 3rem);
      }
      .day-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 10px;
      }
      .day-button {
        border: 1px solid rgba(126,100,82,0.26);
        background: rgba(255,255,255,0.45);
        border-radius: 14px;
        min-height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
      }
      .day-button span {
        font-size: 0.7rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #695a52;
      }
      .day-button strong {
        font-size: 1.1rem;
      }
      .day-button.selected {
        background: rgba(122,90,58,0.18);
        border-color: rgba(122,90,58,0.45);
      }
      .day-button.disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
      .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin: 18px 0 12px;
        color: #675c56;
        font-size: 0.76rem;
      }
      .legend span {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
      }
      .dot.neutral { background: rgba(143,117,94,0.25); }
      .dot.selected { background: #d0b08c; }
      .dot.busy { background: rgba(53,44,40,0.12); }
      .time-group {
        margin-top: 16px;
      }
      .time-title {
        margin-bottom: 10px;
        font-size: 0.9rem;
        color: #5e504a;
      }
      .time-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
      }
      .time-pill {
        border: 1px solid rgba(122,100,82,0.25);
        background: rgba(255,255,255,0.5);
        color: #2a211d;
        border-radius: 14px;
        padding: 12px 10px;
        font-weight: 600;
        cursor: pointer;
      }
      .time-pill.selected {
        background: #d6b78d;
        border-color: #d6b78d;
        color: #2a1f1a;
      }
      .review-card {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .studio-banner {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(255,255,255,0.7);
        border: 1px solid rgba(140,110,88,0.2);
      }
      .mini-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
        background: #f1e3d4;
      }
      .mini-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .studio-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }
      .studio-text strong {
        font-size: 1.2rem;
      }
      .studio-text span {
        font-size: 0.82rem;
        color: #6e5b52;
      }
      .spark {
        color: #a07547;
        font-size: 1.4rem;
      }
      .review-box,
      .detail-box {
        background: rgba(255,255,255,0.7);
        border: 1px solid rgba(140,110,88,0.2);
        border-radius: 18px;
        padding: 18px 18px 12px;
      }
      .review-title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }
      .review-title-row h4 {
        margin: 0;
        font-size: clamp(1.6rem, 1.8vw, 2.2rem);
      }
      .review-title-row span {
        color: #6f5f57;
      }
      .price-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(140,110,88,0.2);
        color: #4f413d;
      }
      .price-line strong {
        font-size: 1.3rem;
      }
      .detail-box {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .detail-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(140,110,88,0.16);
      }
      .detail-row:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
      .detail-icon {
        width: 28px;
        height: 28px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: rgba(223,206,184,0.7);
      }
      .detail-row label {
        display: block;
        margin-bottom: 4px;
        color: #6c5d54;
        font-size: 0.78rem;
      }
      .detail-row strong {
        font-size: 1.1rem;
      }
      .accept-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: rgba(232,220,206,0.7);
        border: 1px solid rgba(140,110,88,0.12);
        border-radius: 16px;
        color: #4d3d36;
      }
      .accept-row input {
        width: 18px;
        height: 18px;
        accent-color: #9c7752;
      }
      @media (max-width: 900px) {
        .booking-shell {
          grid-template-columns: 1fr;
        }
        .profile-photo-wrap {
          min-height: 300px;
        }
        .profile-photo-wrap img {
          min-height: 300px;
        }
      }
      @media (max-width: 640px) {
        .booking-page { padding: 64px 16px 28px; }
        .booking-panel { padding: 16px 14px 18px; }
        .panel-header h3 { font-size: 1.7rem; }
        .service-row { flex-direction: column; align-items: flex-start; }
        .time-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .day-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      }
    `
  ]
})
export class BookingPageComponent {
  readonly camilaPhoto = 'assets/images/imagemcamila.jpeg';
  readonly stepTitles = ['Serviço', 'Data e horário', 'Revisão'];
  readonly filters: ServiceCategory[] = ['Todos', 'Manicure', 'Pedicure', 'Nail art'];

  readonly servicos: ServiceOption[] = [
    { categoria: 'Nail art', nome: 'Nail Art', descricao: 'Designs exclusivos criados à mão, do minimalista ao mais elaborado.', preco: 'R$ 80', duracao: '90 min', imagem: 'assets/images/foto1.jpeg', icone: '✦' },
    { categoria: 'Manicure', nome: 'Manicure Tradicional', descricao: 'Cutícula, forma e esmaltação com acabamento de alta precisão.', preco: 'R$ 35', duracao: '50 min', imagem: 'assets/images/foto2.jpeg', icone: '✧' },
    { categoria: 'Pedicure', nome: 'Pedicure Tradicional', descricao: 'Cuidado completo dos pés, hidratação profunda e esmaltação.', preco: 'R$ 45', duracao: '60 min', imagem: 'assets/images/foto3.jpeg', icone: '✧' },
    { categoria: 'Nail art', nome: 'Mani + Pedi', descricao: 'A experiência completa para quem merece o melhor cuidado.', preco: 'R$ 75', duracao: '110 min', imagem: 'assets/images/foto4.jpeg', icone: '✦' },
  ];

  readonly currentClient = 'ana';
  readonly morningSlots = ['09:00', '10:00', '11:00'];
  readonly afternoonSlots = ['14:00', '15:00', '16:00', '17:00'];

  step = 1;
  selectedCategory: ServiceCategory = 'Todos';
  selectedService = 'Nail Art';
  selectedDay = '';
  selectedHour = '';
  confirmCheck = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly bookingService: BookingService,
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/');
    }
  }

  get filteredServices(): ServiceOption[] {
    if (this.selectedCategory === 'Todos') {
      return this.servicos;
    }

    return this.servicos.filter((service) => service.categoria === this.selectedCategory);
  }

  get selectedServiceInfo(): ServiceOption | undefined {
    return this.servicos.find((service) => service.nome === this.selectedService);
  }

  get selectedServiceName(): string {
    return this.selectedServiceInfo?.nome ?? 'Serviço';
  }

  get currentMonthLabel(): string {
    const date = new Date();
    return new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date).replace(/^(.)/, (match) => match.toUpperCase());
  }

  get monthDays(): Array<{ label: string; day: string; value: string; disabled: boolean }> {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const days: Array<{ label: string; day: string; value: string; disabled: boolean }> = [];

    for (let index = 1; index <= lastDay; index++) {
      const date = new Date(year, month, index);
      const disabled = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const label = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '').replace(/^(.)/, (match) => match.toUpperCase());
      days.push({
        label,
        day: String(index).padStart(2, '0'),
        value: date.toISOString().split('T')[0],
        disabled,
      });
    }

    return days;
  }

  get selectedDateLabel(): string {
    if (!this.selectedDay) {
      return 'Selecione uma data';
    }

    const date = new Date(this.selectedDay + 'T00:00:00');
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', weekday: 'long' }).format(date);
  }

  nextStep(): void {
    if (this.step === 1 && !this.selectedService) {
      return;
    }

    if (this.step === 2 && (!this.selectedDay || !this.selectedHour)) {
      return;
    }

    this.step = Math.min(this.step + 1, 3);
  }

  prevStep(): void {
    this.step = Math.max(this.step - 1, 1);
  }

  selectDay(day: { value: string; disabled: boolean }): void {
    if (day.disabled) {
      return;
    }

    this.selectedDay = day.value;
  }

  abrirMeusAgendamentos(): void {
    this.router.navigateByUrl('/meus-agendamentos');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  confirmBooking(): void {
    if (!this.selectedDay || !this.selectedHour || !this.selectedService) {
      return;
    }

    const booking: BookingEntry = {
      dia: this.formatDisplayDate(this.selectedDay),
      procedimento: this.selectedService,
      horario: this.selectedHour,
      observacoes: '',
      status: 'Pendente',
    };

    this.bookingService.addBooking(booking);
    this.router.navigateByUrl('/meus-agendamentos');
  }

  private formatDisplayDate(value: string): string {
    const date = new Date(value + 'T00:00:00');
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  }
}

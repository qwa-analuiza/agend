import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

interface Servico { categoria: string; nome: string; descricao: string; preco: string; imagem: string; }
interface Depoimento { texto: string; nome: string; funcao: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  styleUrls: ['./app.component.css'],
  template: `
    <header class="nav" [class.scrolled]="scrolled" [class.open]="menuOpen">
      <a class="logo" href="#inicio" aria-label="Camila Nail Studio" (click)="closeMenu()">
        <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#e3c48f"/><stop offset=".5" stop-color="#b8915a"/><stop offset="1" stop-color="#8a6a3b"/>
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#gold)" stroke-width="1.2"/>
          <circle cx="24" cy="24" r="19" fill="none" stroke="url(#gold)" stroke-width=".5"/>
          <text x="24" y="32.5" text-anchor="middle" font-family="Cormorant Garamond, serif" font-style="italic" font-weight="600" font-size="27" fill="url(#gold)">C</text>
          <path d="M24 3.2l1.6 2.2L24 7.6l-1.6-2.2z" fill="url(#gold)"/>
        </svg>
        <span class="logo-text">
          <span class="logo-name">Camila</span>
          <span class="logo-sub">Nail Studio</span>
        </span>
      </a>

      <nav class="menu" id="menu" aria-label="Principal">
        <a *ngFor="let l of links" [href]="l.href" (click)="closeMenu()">{{ l.label }}</a>
        <div class="menu-actions-mobile">
          <button class="btn btn-gold" type="button" (click)="goToBooking()">Agendar horário</button>
        </div>
      </nav>

      <div class="actions">
        <button class="entrar" type="button" (click)="openAuth('login')">Entrar</button>
        <button class="btn btn-gold" type="button" (click)="openAuth('register')">Cadastre-se</button>
      </div>

      <button class="burger" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen" aria-controls="menu" aria-label="Abrir menu">
        <span></span><span></span><span></span>
      </button>
    </header>

    <main>
      <section class="hero" id="inicio">
        <img class="hero-img" src="assets/images/hero.jpg" alt="Camila segurando esmaltes em gel diante do rosto">
        <div class="hero-content">
          <span class="pill">Nail art · Manicure · Pedicure</span>
          <h1>Unhas que contam a sua <em>história.</em></h1>
          <p>Olá, sou a Camila! Especialista em nail art e manicure &amp; pedicure. Cada detalhe pensado só para você.</p>
          <div class="hero-btns">
            <button class="btn btn-gold btn-lg" type="button" (click)="openAuth('login')">Agendar horário</button>
            <a class="btn btn-white btn-lg" href="#servicos">Ver serviços</a>
          </div>
        </div>
      </section>

      <section class="sobre" id="sobre">
        <div class="sobre-fotos">
          <img class="foto-main" src="assets/images/sobre.jpg" alt="Retrato da Camila">
          <div class="thumbs">
            <img src="assets/images/retrato-2.jpg" alt="Mãos com unhas em nude" style="object-position: 75% 92%">
            <img src="assets/images/hero.jpg" alt="Esmaltes em gel" style="object-position: 35% 45%">
            <img src="assets/images/retrato-2.jpg" alt="Camila em retrato" style="object-position: 50% 15%">
          </div>
        </div>
        <div class="sobre-texto">
          <small>Sobre mim</small>
          <h2>Cada esmalte tem <em>a sua assinatura.</em></h2>
          <p>Com mais de 5 anos dedicados à arte das unhas, cada atendimento é uma expressão única de cuidado, técnica e personalidade.</p>
          <p>Especializada em nail art, gel, acrílico e manicure/pedicure tradicional, o resultado sempre reflete quem você é.</p>
          <p class="destaque">Suas unhas merecem uma artista. Não apenas uma manicure.</p>
          <div class="chips">
            <div><strong>Nail Art</strong><span>Designs únicos</span></div>
            <div><strong>Manicure</strong><span>Alto padrão</span></div>
            <div><strong>Pedicure</strong><span>Cuidado total</span></div>
          </div>
        </div>
      </section>

      <section class="servicos" id="servicos">
        <small>O que ofereço</small>
        <h2>Serviços</h2>
        <div class="cards">
          <article class="card" *ngFor="let s of servicos">
            <img class="card-image" [src]="s.imagem" [alt]="s.nome" />
            <span class="card-cat">{{ s.categoria }}</span>
            <h3>{{ s.nome }}</h3>
            <p>{{ s.descricao }}</p>
            <div class="card-foot">
              <strong>{{ s.preco }}</strong>
              <button type="button" class="card-action" (click)="routeToAuth('login')" [attr.aria-label]="'Agendar ' + s.nome">+</button>
            </div>
          </article>
        </div>
        <button class="btn btn-gold" type="button" (click)="openAuth('login')">Agendar agora</button>
      </section>

      <section class="depoimentos" id="depoimentos">
        <small>Clientes felizes</small>
        <h2>Depoimentos</h2>
        <div class="cards three">
          <figure class="review" *ngFor="let d of depoimentos">
            <div class="stars" aria-label="5 estrelas">★★★★★</div>
            <blockquote>“{{ d.texto }}”</blockquote>
            <figcaption>
              <span class="avatar">{{ d.nome[0] }}</span>
              <span><strong>{{ d.nome }}</strong><small>{{ d.funcao }}</small></span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="cta" id="agendar">
        <div class="cta-inner">
          <div>
            <small>Pronta para se cuidar?</small>
            <h2>Reserve o seu horário agora.</h2>
          </div>
          <button class="btn btn-white btn-lg" type="button" (click)="openAuth('login')">Agendar agora</button>
        </div>
      </section>
    </main>

    <div class="auth-overlay" *ngIf="authOpen" (click)="closeAuth()">
      <div class="auth-shell" role="dialog" aria-modal="true" aria-labelledby="auth-title" (click)="$event.stopPropagation()">
        <button class="auth-close" type="button" aria-label="Fechar tela de acesso" (click)="closeAuth()">×</button>

        <div class="auth-visual">
          <img src="assets/images/hero.jpg" alt="Atendimento de manicure e nail art">
          <div class="auth-visual-content">
            <span class="pill">Studio exclusivo</span>
            <h3>Seu próximo cuidado começa aqui.</h3>
            <p>Agende seu atendimento, salve seus serviços favoritos e tenha uma experiência mais prática e exclusiva.</p>
          </div>
        </div>

        <div class="auth-form-wrap">
          <div class="auth-tabs" aria-label="Escolha entre entrar e cadastrar">
            <button type="button" [class.active]="authMode === 'login'" (click)="switchAuth('login')">Entrar</button>
            <button type="button" [class.active]="authMode === 'register'" (click)="switchAuth('register')">Cadastro</button>
          </div>

          <div *ngIf="authMode === 'login'" class="auth-panel">
            <h2 id="auth-title">Bem-vinda de volta</h2>
            <p class="auth-subtitle">Acesse sua conta para continuar.</p>

            <form (ngSubmit)="submitLogin()">
              <label class="field">
                <span>E-mail</span>
                <input type="email" name="loginEmail" [(ngModel)]="login.email" placeholder="seuemail@email.com" required>
              </label>

              <label class="field">
                <span>Senha</span>
                <div class="input-with-action">
                  <input [type]="showPassword ? 'text' : 'password'" name="loginPassword" [(ngModel)]="login.password" placeholder="Digite sua senha" required>
                  <button class="inline-toggle" type="button" (click)="showPassword = !showPassword">
                    {{ showPassword ? 'Ocultar' : 'Mostrar' }}
                  </button>
                </div>
              </label>

              <div class="auth-meta">
                <label class="remember-me">
                  <input type="checkbox">
                  <span>Lembrar de mim</span>
                </label>
                <a href="#" (click)="$event.preventDefault()">Esqueci a senha</a>
              </div>

              <button class="btn btn-gold btn-lg btn-full" type="submit">Entrar</button>
            </form>
          </div>

          <div *ngIf="authMode === 'register'" class="auth-panel">
            <h2 id="auth-title">Crie sua conta</h2>
            <p class="auth-subtitle">Cadastre-se para agendar com mais rapidez.</p>

            <form (ngSubmit)="submitRegister()">
              <label class="field">
                <span>Nome completo</span>
                <input type="text" name="nome" [(ngModel)]="register.nome" placeholder="Seu nome" required>
              </label>

              <div class="two-fields">
                <label class="field">
                  <span>E-mail</span>
                  <input type="email" name="registerEmail" [(ngModel)]="register.email" placeholder="nome@email.com" required>
                </label>
                <label class="field">
                  <span>Telefone</span>
                  <input type="tel" name="telefone" [(ngModel)]="register.telefone" placeholder="(11) 99999-9999" required>
                </label>
              </div>

              <div class="two-fields">
                <label class="field">
                  <span>Senha</span>
                  <input type="password" name="senha" [(ngModel)]="register.senha" placeholder="Crie uma senha" required>
                </label>
                <label class="field">
                  <span>Confirmar senha</span>
                  <input type="password" name="confirmarSenha" [(ngModel)]="register.confirmarSenha" placeholder="Repita a senha" required>
                </label>
              </div>

              <label class="checkline">
                <input type="checkbox" required>
                <span>Aceito os termos e políticas do studio.</span>
              </label>

              <button class="btn btn-gold btn-lg btn-full" type="submit">Criar conta</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <span class="logo-text"><span class="logo-name">Camila</span><span class="logo-sub">Nail Studio</span></span>
      <span>© {{ ano }} Camila Nail Studio. Todos os direitos reservados.</span>
    </footer>
  `,
})
export class HomeComponent {
  scrolled = false;
  menuOpen = false;
  authOpen = false;
  authMode: 'login' | 'register' = 'login';
  showPassword = false;
  readonly ano = new Date().getFullYear();
  readonly whatsapp = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Camila!%20Quero%20agendar%20um%20hor%C3%A1rio.';

  readonly links = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#agendar' },
  ];

  readonly servicos: Servico[] = [
    { categoria: 'Arte', nome: 'Nail Art', descricao: 'Designs exclusivos, da mão livre ao minimalista ou mais elaborado.', preco: 'R$ 80', imagem: 'assets/images/foto1.jpeg' },
    { categoria: 'Clássico', nome: 'Manicure Tradicional', descricao: 'Cutícula, forma e esmaltação com acabamento de alta precisão.', preco: 'R$ 35', imagem: 'assets/images/foto2.jpeg' },
    { categoria: 'Clássico', nome: 'Pedicure Tradicional', descricao: 'Cuidado completo para os pés, com hidratação pedicure e esmaltação.', preco: 'R$ 45', imagem: 'assets/images/foto3.jpeg' },
    { categoria: 'Combo', nome: 'Mani + Pedi', descricao: 'A experiência completa para quem quer mãos e pés impecáveis.', preco: 'R$ 75', imagem: 'assets/images/foto4.jpeg' },
  ];

  readonly depoimentos: Depoimento[] = [
    { texto: 'A Camila é meticulosa. Cada detalhe das minhas unhas foi tratado com atenção que nunca vi em outro studio.', nome: 'Ana Lima', funcao: 'São Paulo' },
    { texto: 'Profissional exemplar: a nail art que ela criou pra mim virou tema de conversa onde quer que eu vá.', nome: 'Juliana Costa', funcao: 'Barueri' },
    { texto: 'Ambiente acolhedor, atendimento premium. Virei cliente fixa há dois anos e não existe comparação.', nome: 'Fernanda Rocha', funcao: 'Alphaville' },
  ];

  login = { email: '', password: '' };
  register = { nome: '', email: '', telefone: '', senha: '', confirmarSenha: '' };

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    const requestedMode = sessionStorage.getItem('authIntent');
    if (requestedMode === 'login' || requestedMode === 'register') {
      setTimeout(() => this.openAuth(requestedMode), 0);
      sessionStorage.removeItem('authIntent');
    }
  }

  routeToAuth(mode: 'login' | 'register' = 'login'): void {
    sessionStorage.setItem('authIntent', mode);
    this.router.navigateByUrl('/');
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }

  openAuth(mode: 'login' | 'register' = 'login'): void {
    this.authMode = mode;
    this.authOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeAuth(): void {
    this.authOpen = false;
    document.body.style.overflow = 'auto';
  }

  switchAuth(mode: 'login' | 'register'): void {
    this.authMode = mode;
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  goToBooking(): void {
    if (this.isLoggedIn()) {
      this.router.navigateByUrl('/agendamento');
      return;
    }

    this.openAuth('login');
  }

  logout(): void {
    this.authService.logout();
  }

  submitLogin(): void {
    this.authService.login();
    this.closeAuth();
    this.router.navigateByUrl('/agendamento');
  }

  submitRegister(): void {
    this.authService.login();
    this.closeAuth();
    this.router.navigateByUrl('/agendamento');
  }
}

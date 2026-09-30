import { Component, HostListener } from '@angular/core';
import { NgFor } from '@angular/common';

interface Servico { categoria: string; nome: string; descricao: string; preco: string; }
interface Depoimento { texto: string; nome: string; funcao: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Troque pelo número real (código do país + DDD + número)
  readonly whatsapp = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Camila!%20Quero%20agendar%20um%20hor%C3%A1rio.';

  scrolled = false;
  menuOpen = false;
  readonly ano = new Date().getFullYear();

  readonly links = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#agendar' },
  ];

  readonly servicos: Servico[] = [
    { categoria: 'Arte', nome: 'Nail Art', descricao: 'Designs exclusivos, da mão livre ao minimalista ou mais elaborado.', preco: 'R$ 80' },
    { categoria: 'Clássico', nome: 'Manicure Tradicional', descricao: 'Cutícula, forma e esmaltação com acabamento de alta precisão.', preco: 'R$ 35' },
    { categoria: 'Clássico', nome: 'Pedicure Tradicional', descricao: 'Cuidado completo para os pés, com hidratação pedicure e esmaltação.', preco: 'R$ 45' },
    { categoria: 'Combo', nome: 'Mani + Pedi', descricao: 'A experiência completa para quem quer mãos e pés impecáveis.', preco: 'R$ 75' },
  ];

  readonly depoimentos: Depoimento[] = [
    { texto: 'A Camila é meticulosa. Cada detalhe das minhas unhas foi tratado com atenção que nunca vi em outro studio.', nome: 'Ana Lima', funcao: 'São Paulo' },
    { texto: 'Profissional exemplar: a nail art que ela criou pra mim virou tema de conversa onde quer que eu vá.', nome: 'Juliana Costa', funcao: 'Barueri' },
    { texto: 'Ambiente acolhedor, atendimento premium. Virei cliente fixa há dois anos e não existe comparação.', nome: 'Fernanda Rocha', funcao: 'Alphaville' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }
}

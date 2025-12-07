import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {
  @Input() message = 'Bientôt disponible';
  @Input() description = 'Nous travaillons sur cette section. Revenez bientôt !';
  @Input() showBackButton = true;
}


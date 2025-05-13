import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHistoricoDeMensajes } from '../../state/mensajes/mensajes.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-componente-lector-historico',
  imports: [],
  templateUrl: './componente-lector-historico.component.html',
  styleUrl: './componente-lector-historico.component.css',
  standalone: true,
})
export class ComponenteLectorHistoricoComponent implements OnDestroy {

  historicoDeMensajes: string[] = [];
  private readonly subscription: Subscription;

  constructor(private readonly store: Store) {
    this.subscription = this.store.select(selectHistoricoDeMensajes).subscribe(
      historico => this.historicoDeMensajes = historico
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

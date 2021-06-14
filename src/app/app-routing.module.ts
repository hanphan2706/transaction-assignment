import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionsPageComponent } from './features/transactions/pages/transactions-page.component';

const routes: Routes = [{ path: '', component: TransactionsPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

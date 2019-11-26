import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Tables'
    },
    children: [
      {
        path: 'datatable',
        loadChildren: () => import('./datatable/datatable.module').then(m => m.DatatableInitModule)
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Tables'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {}

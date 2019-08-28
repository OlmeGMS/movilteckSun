import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import User */
import { HomeComponent } from './pages/home/home.component';

/* Import Tabla */
import { TablesComponent } from './pages/tables/tables.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'tablas/:divisa', component: TablesComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

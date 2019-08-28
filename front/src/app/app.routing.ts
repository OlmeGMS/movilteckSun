import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Import User */
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';

/* Import Tabla */
import { TablesComponent } from './pages/tables/tables.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'tablas/:divisa', component: TablesComponent},
    {path: 'usuarios/:page', component: UsersComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

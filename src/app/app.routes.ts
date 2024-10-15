import { Routes } from '@angular/router';
import { AllComponent } from './Components/all/all.component';
import { ActiveComponent } from './Components/active/active.component';
import { CompletedComponent } from './Components/completed/completed.component';
import { GetApiComponent } from './Components/get-api/get-api.component';

export const routes: Routes = [
    { path: 'active', component: ActiveComponent },
    { path: 'all', component: AllComponent},
    { path: 'completed', component: CompletedComponent},
    { path: 'getApi', component: GetApiComponent},
];

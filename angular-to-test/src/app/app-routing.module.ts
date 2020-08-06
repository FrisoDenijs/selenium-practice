import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { AddOrEditPersonComponent } from './add-or-edit-person/add-or-edit-person.component';

const routes: Routes = [
  { path: 'persons', component: PersonListComponent },
  { path: 'persons/:id', component: PersonComponent },
  { path: 'persons/add', component: AddOrEditPersonComponent },
  { path: 'persons/edit/:id', component: AddOrEditPersonComponent },
  { path: '', pathMatch: 'full', redirectTo: 'persons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

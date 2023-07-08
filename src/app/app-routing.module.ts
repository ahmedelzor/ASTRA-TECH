import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { UpdatepostComponent } from './posts/updatepost/updatepost.component';

const routes: Routes = [
  {path : "home" , component : HomeComponent},
  {path : "" , redirectTo : "home",pathMatch : "full"},
  {path : "addp" , component : AddPostComponent},
  {path : "list" , component : ListPostComponent},
  {path:"list/:id",component : UpdatepostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

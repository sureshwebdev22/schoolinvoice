import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Students } from './students/students';
import { Invoices } from './invoices/invoices';
import { Myprofile } from './myprofile/myprofile';
import { authGuard } from './guard/auth-guard';
import { EditStudent } from './students/edit-student/edit-student';
import { ParentCreate } from './parent-create/parent-create';
import { ParentSearch } from './parent-search/parent-search';
import { CreateStudent } from './students/create-student/create-student';
import { SearchParent } from './parent/search-parent/search-parent';
import { CreateUser } from './user/create-user/create-user';
import { SearchUser } from './user/search-user/search-user';

export const routes: Routes = [
    { path: 'home', component: Home ,canActivate: [authGuard]},
    { path: 'login', component: Login },
    { path: 'students', component: Students ,canActivate: [authGuard]},
    { path: 'invoices', component: Invoices ,canActivate: [authGuard]},
    { path: 'myprofile', component: Myprofile ,canActivate: [authGuard]},
    {path: 'edit-student/:id', component: EditStudent ,canActivate: [authGuard]},
    { path: 'parent/create', component: ParentCreate ,canActivate: [authGuard]},
    {path: 'student/create', component: CreateStudent ,canActivate: [authGuard]},
    {path: 'parent/search', component: ParentSearch ,canActivate: [authGuard]},
    {path: 'user/create', component: CreateUser ,canActivate: [authGuard]},
    {path: 'user/search', component: SearchUser ,canActivate: [authGuard]},


    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

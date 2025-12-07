import {Routes} from '@angular/router';
import {CarsListComponent} from "./features/cars/pages/cars-list/cars-list.component";
import {HomeComponent} from "./features/home/pages/home/home.component";
import {FavoritesComponent} from "./features/cars/pages/favorites/favorites.component";
import {CartComponent} from "./features/cars/pages/cart/cart.component";
import {CarDetailsComponent} from "./features/cars/pages/car-details/car-details.component";
import {CheckoutComponent} from "./features/cars/pages/checkout/checkout.component";
import {CategoriesComponent} from "./features/cars/pages/categories/categories.component";
import {LoginComponent} from "./features/auth/pages/login/login.component";
import {SignupComponent} from "./features/auth/pages/signup/signup.component";
import {ProfileComponent} from "./features/auth/pages/profile/profile.component";
import {ContactComponent} from "./features/contact/pages/contact/contact.component";
import {AdminLoginComponent} from "./features/admin/pages/admin-login/admin-login.component";
import {AdminDashboardComponent} from "./features/admin/pages/admin-dashboard/admin-dashboard.component";
import {CarFormComponent} from "./features/admin/pages/car-form/car-form.component";
import {adminGuard} from "./core/guards/admin.guard";

export const routes: Routes = [
  {
    path: "cars",
    component: CarsListComponent
  },
  {
    path: "cars/:id",
    component: CarDetailsComponent
  },
  {
    path: "favorites",
    component: FavoritesComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "admin/login",
    component: AdminLoginComponent
  },
  {
    path: "admin/dashboard",
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  {
    path: "admin/cars/new",
    component: CarFormComponent,
    canActivate: [adminGuard]
  },
  {
    path: "admin/cars/:id/edit",
    component: CarFormComponent,
    canActivate: [adminGuard]
  },
  {
    path: "",
    component: HomeComponent
  }
];

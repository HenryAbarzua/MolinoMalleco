import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ProductDetailsComponent } from './Products/product-details/product-details.component';
import { ProducstListComponent } from './Products/producst-list/producst-list.component';
import { CreateProductComponent } from './Products/create-product/create-product.component';
import { ProductViewComponent } from './product-view/product-view.component';

import { ClientDetailsComponent} from './Clientes/client-details/client-details.component';
import { ClientsListComponent} from './Clientes/clients-list/clients-list.component';
import { CreateClientComponent} from './Clientes/create-client/create-client.component';
import { ClientViewComponent} from './client-view/client-view.component'

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {ConfirmationDialogComponent} from "./Products/product-details/confirmation-dialog/confirmation-dialog.component";
import { from } from 'rxjs';
import { ListCustomersComponent } from './components/list-customers/list-customers.component';
import {MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import {CustomersService} from './service/customers.service';

import {AngularFirestoreModule} from '@angular/fire/firestore'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SendEmailComponent,
    ProductDetailsComponent,
    ProducstListComponent,
    CreateProductComponent,
    ProductViewComponent,
    ClientDetailsComponent,
    ClientsListComponent,
    CreateClientComponent,
    ConfirmationDialogComponent,
    ClientViewComponent,
    ListCustomersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    NgbModule,
    MatDialogModule, 
    BrowserAnimationsModule, 
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule 
 
    
    
    
    
  ],
  providers: [CustomersService],
  bootstrap: [AppComponent]

})
export class AppModule { }

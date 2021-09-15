import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../classes/Cliente';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
const BaseUrl='http://localhost:3030/api/';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form:FormGroup;
  private newClient: Cliente = new Cliente();

  constructor(private fb: FormBuilder, private http:HttpClient , private _snackBar: MatSnackBar) {
    this.form =this.fb.group({
      name:['',Validators.required],
      lastname:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  registrar(){
    const name = this.form.value.name;
    const lastname = this.form.value.lastname;
    this.newClient= <Cliente> this.form.value;
    this.http.post(BaseUrl+'clients',this.newClient)
      .subscribe( (result) =>{
        console.warn(this.newClient);
        console.log(result);
        
        this._snackBar.open("El cliente se ha registrado", "Entendido",{
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        catchError(error => {
          this._snackBar.open("El cliente NO se ha registrado", "Entendido",{
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          console.log(error);
          return Observable.throw('Algo Salio Mal');
        })
      })
  }
}

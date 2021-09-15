import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const BaseUrl='http://localhost:3030/api/';

export interface ClientInfo {
  name: string;
  lastname: string;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css','../form/form.component.css']
})
export class TablaComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName'];
  dataSource : ClientInfo[];

  constructor(private http:HttpClient,private _snackBar: MatSnackBar){
    this.dataSource= [];
  }

  fetchClient(){
    this.getClients().subscribe(data => {
      console.log(data)
      this.dataSource=data;
    })
  }
  getClients():Observable<ClientInfo[]>{
    return this.http.get<ClientInfo[]>(BaseUrl+"clients");

  }
  ngOnInit(): void {
    this.fetchClient();
  }

}

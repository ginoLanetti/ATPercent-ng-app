import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FetchingSequencesService {
    constructor(private httpClient: HttpClient){}
    
    fetchSequence(idNumber): Observable<any> {
        const apiUrl = `https://rest.ensembl.org/sequence/id/${idNumber}`
        console.log(this.httpClient.get(apiUrl))
        return this.httpClient.get(apiUrl) 
    }
}
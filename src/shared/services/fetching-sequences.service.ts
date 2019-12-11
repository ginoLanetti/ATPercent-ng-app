import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FetchSequencesResponse {
    desc: string;
    id: string;
    molecule: string;
    query: string;
    seq: string;
    version: number;
}
@Injectable({ providedIn: 'root' })
export class FetchingSequencesService {
    constructor(private httpClient: HttpClient) { }

    fetchSequence(idNumber: string): Observable<FetchSequencesResponse> {
        const apiUrl = `https://rest.ensembl.org/sequence/id/${idNumber}`;
        return this.httpClient.get<FetchSequencesResponse>(apiUrl);

    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BeforeFooterSectionService {

    constructor(private http: HttpClient) { }

    add(data) {
        return this.http.post(environment.apiBaseUrl + '/beforefootersection/add', data);
    }

    getAllBeforeFooter() {
        return this.http.get(environment.apiBaseUrl + '/beforefootersection/getAllBeforeFooter');
    }

    getSingleBeforeFooter(id) {
        return this.http.get(environment.apiBaseUrl + '/beforefootersection/getSingleBeforeFooter/' + id);
    }

    updateSingleBeforeFooter(id, data) {
        return this.http.put(environment.apiBaseUrl + '/beforefootersection/updateSingleBeforeFooter/' + id, data);
    }
}

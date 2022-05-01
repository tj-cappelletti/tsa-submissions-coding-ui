import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { from, map, Observable } from 'rxjs';
import { ITeam } from './team';
import { AppConfig } from 'src/app/app-config.component';

@Injectable({ providedIn: 'root' })
export class TeamService {
    private apiUrl = AppConfig._apiRoot + 'Teams';

    constructor(private _httpClient: HttpClient,
        private _authService: AuthService) { }

    public async getTeams(): Promise<Observable<ITeam[]>> {
        const token = await this._authService.getAccessToken();

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this._httpClient.get<ITeam[]>(this.apiUrl, { headers: headers })
    }

    public async addTeam(team: ITeam) {
        const token = await this._authService.getAccessToken();

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this._httpClient.post(this.apiUrl, team, { headers: headers });
    }
}

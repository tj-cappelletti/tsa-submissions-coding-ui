import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITeam } from './team';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  private teamSubsription!: Subscription;

  displayedColumns: string[] = ['id', 'teamId', 'schoolNumber', 'teamNumber', 'numOfParticipants'];

  errorMessage = '';
  teams: ITeam[] = [];

  constructor(private teamService: TeamService) { }

  async ngOnInit(): Promise<void> {
    this.teamSubsription = (await this.teamService.getTeams()).subscribe({
      next: teams => {
        this.teams = teams
      },
      error: err => this.errorMessage = err
    })
  }

}


/*
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITeam } from './team';
import { TeamService } from './team.service';

@Component({
    
    templateUrl: './team-list.component.html'
})

export class TeamListComponent implements OnInit, OnDestroy {
    errorMessage = '';
    teams: ITeam[] = [];
    private teamSubsription!: Subscription;

    constructor(private teamService: TeamService) { }

    async ngOnInit() {
        this.teamSubsription = (await this.teamService.getTeams()).subscribe({
            next: teams => {
                this.teams = teams
            },
            error: err => this.errorMessage = err
        })
    }

    ngOnDestroy(): void {
        this.teamSubsription.unsubscribe();
    }
}
*/
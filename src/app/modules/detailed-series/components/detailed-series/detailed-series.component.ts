import { TvShowService } from 'src/app/shared/services/tv-show.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { IDetailedTvShow } from 'src/app/shared/models/interfaces/detailed-tv-show';
import { ISmallCardConfig } from 'src/app/shared/models/interfaces/small-card-config';
import { ISeason } from 'src/app/shared/models/interfaces/season';

@Component({
  selector: 'app-detailed-series',
  templateUrl: './detailed-series.component.html',
  styleUrls: ['./detailed-series.component.css']
})
export class DetailedSeriesComponent implements OnInit {

  constructor(
    private TvShowService: TvShowService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService
    ) { }

  serie$?: Observable<IDetailedTvShow>;
  buttonText: string = "Back";
  imdbUrl!: string

  ngOnInit(): void {
    this.imdbUrl = this.navigationService.imdbUrl()
    this.serie$ = this.route.params.pipe(switchMap(params => {
      const id = params['id']
      if(!id) return EMPTY
      return this.TvShowService.getTvShowDetails(id)
    }))

  }

  goBack(event: any): void {
    event.preventDefault()
    this.navigationService.back();
  }

  onPersonClick(id:number): void {
    this.router.navigateByUrl(`person/${id}`);
  }

  createCardConfig(season: ISeason): ISmallCardConfig {
    return {
      imageUrl: season.posterPath,
      title: season.name,
      subtitle: `${season.episodeCount} episodes`,
    }
  }
}

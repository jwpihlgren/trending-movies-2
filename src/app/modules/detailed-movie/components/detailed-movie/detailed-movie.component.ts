import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, concatMap, flatMap, map, mergeMap, startWith, switchAll, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetailedMovie } from 'src/app/shared/models/interfaces/detailed-movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-detailed-movie',
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.css']
})
export class DetailedMovieComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService
  ) { }

  movie$?: Observable<IDetailedMovie>;
  buttonText: string = "Back"
  imdbUrl!: string

  ngOnInit(): void {
    this.imdbUrl = this.navigationService.imdbUrl()
    this.movie$ = this.route.params.pipe(switchMap(params => {
      const id = params['id']
      if (!id) {
        return EMPTY
      }
      return this.movieService.getMovieDetails(id).pipe(tap(data => console.log(data)))
    }))
  }

  goBack(event: any): void {
    event.preventDefault()
    this.navigationService.back();
  }

  onPersonClick(id: number): void {
    this.router.navigateByUrl(`person/${id}`);
  }


}

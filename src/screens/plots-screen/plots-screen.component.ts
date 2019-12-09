import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PlotsState } from 'src/shared/state/plot.state';
import { Observable, Subscription } from 'rxjs';
import { PlotDataModel } from 'src/shared/models/plot-data.model';
import { getFromLocalStorage } from 'src/shared/services/local-storage.service';
import { GetPlotsData } from 'src/shared/state/plot.actions';

@Component({
    selector:'app-plots-screen',
    templateUrl: './plots-screen.component.html',
    styleUrls: ['./plots-screen.component.scss']
})
export class PlotsScreenComponent implements OnInit, OnDestroy {
    @Select(PlotsState.plots) plotsData$: Observable<PlotDataModel[]>
    plotData: PlotDataModel[];
    plotDataSubscription: Subscription;
    constructor(private store: Store) {
    }
    ngOnInit(): void {
        this.plotDataSubscription = this.plotsData$.subscribe((data) => this.plotData = data)
        this.fetchPlotsFromLocalStorage()
    }
    ngOnDestroy(): void {
        this.plotDataSubscription.unsubscribe()
    }
    private fetchPlotsFromLocalStorage() {
        this.store.dispatch(new GetPlotsData())
    } 
}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PlotState } from 'src/shared/state/plot.state';
import { Observable, Subscription } from 'rxjs';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import { GetPlotData } from 'src/shared/state/plot.actions';

@Component({
    templateUrl: './plots-screen.component.html',
    selector: 'app-plots-screen',
    styleUrls: ['./plots-screen.component.scss']

})
export class PlotsScreenComponent implements OnInit, OnDestroy{
    @Select(PlotState.plots) plotsData$: Observable<SequenceDataModel[]>
    plotsDataSubcription: Subscription;
    plotsData: SequenceDataModel[];

    constructor(private store: Store) {

    }

    ngOnInit(){
        this.plotsDataSubcription = this.plotsData$.subscribe((plotsData) => this.plotsData = plotsData)
        this.fetchPlotsFromLocalStorage()
    }
    ngOnDestroy(): void {
        this.plotsDataSubcription.unsubscribe()
    }
    private fetchPlotsFromLocalStorage() {
        this.store.dispatch(new GetPlotData())
    } 
}
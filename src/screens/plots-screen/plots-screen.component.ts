import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { PlotsState } from 'src/shared/state/plot.state';
import { Observable, Subscription } from 'rxjs';
import { PlotDataModel } from 'src/shared/models/plot-data.model';
import { GetPlotsData, RemovePlot, AddDataToRerender } from 'src/shared/state/plot.actions';
import { ChartDataModel } from 'src/shared/models/chart-data.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-plots-screen',
    templateUrl: './plots-screen.component.html',
    styleUrls: ['./plots-screen.component.scss']
})
export class PlotsScreenComponent implements OnInit, OnDestroy {
    @Select(PlotsState.plots) plotsData$: Observable<ChartDataModel[]>;
    plotsData: ChartDataModel[];
    tableHeaders = ['Plot Name', 'Re-render', 'Remove'];
    tableData = [];
    plotDataSubscription: Subscription;

    constructor(private store: Store, private router: Router) {}

    ngOnInit() {
        this.fetchPlotsFromLocalStorage();
        this.plotDataSubscription = this.plotsData$.subscribe(data => {
            this.plotsData = data;
        });
    }

    ngOnDestroy() {
        this.plotDataSubscription.unsubscribe();
    }

    reRender(plotData: Array<PlotDataModel>) {
        this.store.dispatch(new AddDataToRerender(plotData));
        this.router.navigate(['/new-plot']);
    }

    removePlot(plotName: string) {
        this.store.dispatch(new RemovePlot(plotName));
    }

    private fetchPlotsFromLocalStorage() {
        this.store.dispatch(new GetPlotsData());
    }
}

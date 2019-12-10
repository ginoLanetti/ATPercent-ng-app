
import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { PlotDataModel } from '../../models/plot-data.model';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import * as PlotLogic from '../../utils/plot-logic-conversion.util';
import { returnChart } from './../../utils/plot-object-template.util';
import { Store, Select } from '@ngxs/store';
import { FormControl, Validators } from '@angular/forms';
import { SavePlot } from 'src/shared/state/plot.actions';
import { ChartDataModel } from 'src/shared/models/chart-data.model';
import { Observable, Subscription } from 'rxjs';
import { PlotsState } from 'src/shared/state/plot.state';


@Component({
    selector: 'app-plot-area',
    templateUrl: './plot-area.component.html',
    styleUrls: ['./plot-area.component.scss']
})
export class PlotAreaComponent implements OnInit, OnDestroy {
    @Input() sequenceData: SequenceDataModel
    @Select(PlotsState.reRender) reRenderData$: Observable<Array<PlotDataModel>>
    @Select(PlotsState.plots) plotsData$: Observable<ChartDataModel[]>
    plotData: PlotDataModel[];
    reRenderSubscription: Subscription;
    plotsDataSubscription: Subscription;
    chartNameControl: FormControl;
    chartNames: Array<string>
    submitted: boolean;
    
    constructor(private store: Store) {}

    ngOnChanges(changes: SimpleChanges): void {
        if(this.sequenceData){
            const dataToConvert = changes.sequenceData.currentValue;
            const finalDataset = this.convertSequenceDatatoPlotData(dataToConvert)
            this.plotData = finalDataset
            this.createChart(finalDataset)
        }
    }

    ngOnInit() {
        this.chartNameControl = new FormControl('', [Validators.required])
        this.reRenderSubscription = this.reRenderData$.subscribe(data => {
            this.createChart(data)
        })
        this.plotsDataSubscription =  this.plotsData$.subscribe(data => {
            this.chartNames = data.map(datum => (
                datum.name
            ))
        })
    }

    ngOnDestroy(): void {
        this.reRenderSubscription.unsubscribe() 
    }

    private savePlot() {
        const nameExists = this.checkIfNameExists()
        if(nameExists) {
            this.chartNameControl.setErrors({notUnique: true})
        } else {
            this.submitted = true
            const chartName: string = this.chartNameControl.value
            const newChartData = new ChartDataModel(chartName, this.plotData)
            this.store.dispatch(new SavePlot(newChartData))
        }
    }
    
    private checkIfNameExists(): boolean {
        const searchName = this.chartNameControl.value
        return !!this.chartNames.find(name => (
            name === searchName
        ))
    }
    private convertSequenceDatatoPlotData(sequenceData: SequenceDataModel): PlotDataModel[] {
        const { step , seqFileContent } = sequenceData;
        const windowWidth = sequenceData.window;
        const sequencesAndLabels = sequenceData.label 
            ? {sequences: [sequenceData.seqFileContent], labels: [sequenceData.label]} 
            : PlotLogic.returnSequencesAndLabels(seqFileContent);
        const { sequences, labels } = sequencesAndLabels;
        const mulitpleXYDatasets = PlotLogic.returnPlotDataset(labels, sequences, windowWidth, step);
        return mulitpleXYDatasets;
    }
    private createChart(chartData) {
        const chart = returnChart(chartData);
        chart.render();
    }
}

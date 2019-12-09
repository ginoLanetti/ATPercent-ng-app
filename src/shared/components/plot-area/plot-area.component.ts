
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PlotDataModel } from '../../models/plot-data.model';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import * as PlotLogic from '../../utils/plot-logic-conversion.util';
import { returnChart } from './../../utils/plot-object-template.util';
import { Store } from '@ngxs/store';
import { FormControl } from '@angular/forms';
import { SavePlot } from 'src/shared/state/plot.actions';


@Component({
    selector: 'app-plot-area',
    templateUrl: './plot-area.component.html',
    styleUrls: ['./plot-area.component.scss']
})
export class PlotAreaComponent implements OnInit {
    @Input() valid: boolean;
    @Input() sequenceData: SequenceDataModel
    plotNameControl: FormControl;
    plotData: PlotDataModel[]
    constructor(private store: Store) {
    }
    ngOnChanges(changes: SimpleChanges): void {
        const dataToConvert = changes.sequenceData.currentValue;
        const finalDataset = this.convertSequenceDatatoPlotData(dataToConvert);
        const chart = returnChart(finalDataset)
        this.plotData = finalDataset
        chart.render();
    }
    ngOnInit() {
        this.plotNameControl = new FormControl('')
    }

    private savePlot(){
        const plotName: string = this.plotNameControl.value
        const namedPlotData = []
        this.plotData.forEach(plot => namedPlotData.push(new PlotDataModel(plot, plotName)))
        this.store.dispatch(new SavePlot(namedPlotData))
    }
    private convertSequenceDatatoPlotData(sequenceData: SequenceDataModel): PlotDataModel[] {
        const { step , seqFileContent } = sequenceData;
        const windowWidth = sequenceData.window;
        const sequencesAndLabels = PlotLogic.returnSequencesAndLabels(seqFileContent);
        const { sequences, labels } = sequencesAndLabels;
        const mulitpleXYDatasets = PlotLogic.returnPlotDataset(labels, sequences, windowWidth, step);
        return mulitpleXYDatasets;

    }


}

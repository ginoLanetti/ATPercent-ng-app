
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PlotDataModel } from '../../models/plot-data.model';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';
import * as PlotLogic from '../../utils/plot-logic-conversion.util';
import  { returnChart } from './../../utils/plot-object-template.util';


@Component({
    selector: 'app-plot-area',
    templateUrl: './plot-area.component.html',
    styleUrls: ['./plot-area.component.scss']
})
export class PlotAreaComponent implements OnInit {
    @Input() sequenceData: SequenceDataModel;

    ngOnChanges(changes: SimpleChanges): void {
        const dataToConvert = changes.sequenceData.currentValue;
        const finalDataset = this.convertSequenceDatatoPlotData(dataToConvert);
        console.log(finalDataset)
        const chart = returnChart(finalDataset)
        chart.render();

    }
    ngOnInit() {

        
    }
    
    private convertSequenceDatatoPlotData(sequenceData: SequenceDataModel): PlotDataModel[] {
        console.log(sequenceData)
        const { step , seqFileContent } = sequenceData;
        const windowWidth = sequenceData.window;
        const sequencesAndLabels = PlotLogic.returnSequencesAndLabels(seqFileContent);
        const { sequences, labels } = sequencesAndLabels;
        const mulitpleXYDatasets = PlotLogic.returnPlotDataset(labels, sequences, windowWidth, step);
        return mulitpleXYDatasets;

    }


}

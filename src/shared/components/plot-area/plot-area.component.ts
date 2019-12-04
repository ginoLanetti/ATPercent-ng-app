
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlotDataModel } from '../../models/plot-data.model';
import * as CanvasJS from './canvasjs.min.js';
import { SequenceDataModel } from 'src/shared/models/sequence-data.model';

@Component({
    selector: 'app-plot-area',
    templateUrl: './plot-area.component.html',
    styleUrls: ['./plot-area.component.scss']
})
export class PlotAreaComponent implements OnInit {
    @Input() sequenceData: SequenceDataModel;

    ngOnInit() {
        const chart = new CanvasJS.Chart('chartContainer', {
            zoomEnabled: true,
            animationEnabled: true,
            exportEnabled: true,
            colorSet: 'colorSet2',
            title: {
                text: 'AT % Content',
                fontFamily: 'Calibri'
            },
            toolTip: {
                shared: true
            },
            legend: {
                fontFamily: 'Calibri',
                cursor: 'pointer',
                verticalAlign: 'top',
                horizontalAlign: 'center',
                dockInsidePlotArea: true,
                // not working ? ? ? itemclick: toogleDataSeries
            },
            axisX: {
                gridColor: 'lightgrey',
                gridThickness: 1
              },
            axisY: {
                gridColor: 'lightgrey',
                gridThickness: 1
              },
            data: [
                {
                    type: 'line',
                    name: 'San Fransisco',
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: [
                        {x: 3, y: 2},
                        {x: 4, y: 3},
                        {x: 5, y: 1}
                    ]
                },
                {
                    type: 'line',
                    name: 'San SDASDASD',
                    showInLegend: true,
                    markerSize: 0,
                    dataPoints: [
                        {x: 2, y: 2},
                        {x: 3, y: 1},
                        {x: 5, y: 3}
                    ]
                }
            ]
        });
        chart.render();
    }


}

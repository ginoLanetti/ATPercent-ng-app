import * as CanvasJS from './canvasjs.min.js';
import { PlotDataModel } from '../models/plot-data.model.js';

export const returnChart = (finalDataset: PlotDataModel[]) => {
    const chartTemplate = new CanvasJS.Chart('chartContainer', {
        zoomEnabled: true,
        exportEnabled: true,
        animationEnabled: true,
        colorSet: 'colorSet2',
        toolTip: {
            shared: true
        },
        legend: {
            fontFamily: 'Montserrat',
            cursor: 'pointer',
            verticalAlign: 'top',
            horizontalAlign: 'center',
            dockInsidePlotArea: true,
            itemclick(e) {
                if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                e.chart.render();
            }
        },
        axisX: {
            title: 'Position [bp]',
            labelFontFamily: 'Montserrat',
            gridColor: 'lightgrey',
            gridThickness: 1
        },
        axisY: {
            title: 'AT content [%]',
            labelFontFamily: 'Montserrat',
            gridColor: 'lightgrey',
            gridThickness: 1
        },
        data: finalDataset
    });
    return chartTemplate;
};



import { ChartDataModel } from '../models/chart-data.model';
import { PlotDataModel } from '../models/plot-data.model';

export class SavePlot {
    static readonly type = '[PLOT] Save plot'
    constructor(public chartData: ChartDataModel) { }
}

export class GetPlotsData {
    static readonly type = '[LocalStorage] Get plot data'
}

export class RemovePlot {
    static readonly type = '[PLOT] Remove plot'
    constructor(public chartNameToRemove: string) { }
}

export class AddDataToRerender {
    static readonly type = '[PLOT] Add data to rerender'
    constructor(public dataToRerender: Array<PlotDataModel>) { }
}
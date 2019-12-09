import { PlotDataModel } from "../models/plot-data.model";

export class SavePlot {
    static readonly type = '[PLOT] Save plot'
    constructor(public plotData: PlotDataModel[]) {}
}

export class GetPlotsData {
    static readonly type = '[LocalStorage] Get plot data'
}

export class RemovePlot {
    static readonly type = '[PLOT] Remove plot'
    constructor(public plotData: string) {}
}
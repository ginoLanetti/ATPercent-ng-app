import { PlotDataModel } from '../models/plot-data.model'

export class SavePlot {
    static readonly type = '[PLOT] Save'

    constructor(public payload: PlotDataModel) {}
}

export class RemovePlot {
    static readonly type = '[PLOT] Remove'

    constructor(public payload: string) {}
}
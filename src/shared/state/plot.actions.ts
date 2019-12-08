import { SequenceDataModel } from '../models/sequence-data.model'

export class SavePlot {
    static readonly type = '[PLOT] Save'

    constructor(public sequenceData: SequenceDataModel) {}
}

export class GetPlotData {
    static readonly type = '[PLOT] Get plot data'
    
}

export class RemovePlot {
    static readonly type = '[PLOT] Remove'

    constructor(public payload: string) {}
}
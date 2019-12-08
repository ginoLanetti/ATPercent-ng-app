import { SequenceDataModel } from "../models/sequence-data.model";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SavePlot, GetPlotData } from './plot.actions';
import { setInLocalStorage, getFromLocalStorage } from '../services/local-storage.service';

interface PlotStateModel {
    sequencesData: SequenceDataModel[]
}

@State<PlotStateModel>({
    name: 'plotData',
    defaults: {
        sequencesData: []
    }
})
export class PlotState {
    @Selector()
    static plots(state: PlotStateModel): SequenceDataModel[] {
        return state.sequencesData
    }
    @Action(SavePlot)
    savePlot(context: StateContext<PlotStateModel>, action: SavePlot){
        const currentState = context.getState().sequencesData
        const newSequencesData = [...currentState, action.sequenceData]
        setInLocalStorage('sequencesData', newSequencesData)
        context.patchState({
            sequencesData: newSequencesData
        })
    }
    @Action(GetPlotData)
    getPlotData(context: StateContext<PlotStateModel>) {
        const dataFromLocalStorage = getFromLocalStorage('sequencesData')
        context.patchState({
            sequencesData: dataFromLocalStorage
        })
    }
}

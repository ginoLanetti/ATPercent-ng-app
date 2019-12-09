import { PlotDataModel } from "../models/plot-data.model";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SavePlot, GetPlotsData } from '../state/plot.actions';
import { setInLocalStorage, getFromLocalStorage } from '../services/local-storage.service';

interface PlotsStateModel {
    plotsData: PlotDataModel[][]
}
@State<PlotsStateModel>({
    name: 'plotsData',
    defaults: {
        plotsData: []
    }
})
export class PlotsState{
    @Selector()
    static plots(state: PlotsStateModel): PlotDataModel[][] {
        return state.plotsData
    }
    @Action(SavePlot)
    savePlot(context: StateContext<PlotsStateModel>, action: SavePlot){
        const currentPlotsData = context.getState().plotsData
        const newPlotsData = currentPlotsData ? [...currentPlotsData, action.plotData] : [action.plotData]
        setInLocalStorage('plotsData', newPlotsData)
        context.patchState({
            plotsData: newPlotsData
        })
    }
    @Action(GetPlotsData)
    getPlotData(context: StateContext<PlotsStateModel>){
        const localStorageData = getFromLocalStorage('plotsData');
        context.patchState({
            plotsData: localStorageData
        })
    }

}
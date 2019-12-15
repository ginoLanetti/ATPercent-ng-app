import { PlotDataModel } from "../models/plot-data.model";
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SavePlot, GetPlotsData, RemovePlot, AddDataToRerender } from '../state/plot.actions';
import { setInLocalStorage, getFromLocalStorage } from '../services/local-storage.service';
import { ChartDataModel } from '../models/chart-data.model';

interface PlotsStateModel {
    plotsData: ChartDataModel[]
    dataToRerender: Array<PlotDataModel>
}
@State<PlotsStateModel>({
    name: 'plotsData',
    defaults: {
        plotsData: [],
        dataToRerender: []
    }
})
export class PlotsState {
    @Selector()
    static plots(state: PlotsStateModel): ChartDataModel[] {
        return state.plotsData
    }
    @Selector()
    static reRender(state: PlotsStateModel): Array<PlotDataModel> {
        return state.dataToRerender
    }
    @Action(SavePlot)
    savePlot(context: StateContext<PlotsStateModel>, action: SavePlot) {
        const currentPlotsData = context.getState().plotsData
        const newPlotsData = currentPlotsData ? [...currentPlotsData, action.chartData] : [action.chartData]
        setInLocalStorage('plotsData', newPlotsData)
        context.patchState({
            plotsData: newPlotsData
        })
    }
    @Action(GetPlotsData)
    getPlotData(context: StateContext<PlotsStateModel>) {
        const localStorageData = getFromLocalStorage('plotsData');
        context.patchState({
            plotsData: localStorageData
        })
    }
    @Action(RemovePlot)
    removePlot(context: StateContext<PlotsStateModel>, action: RemovePlot) {
        const trimmedPlotsData = context.getState().plotsData.filter(plot => plot.name != action.chartNameToRemove)
        setInLocalStorage('plotsData', trimmedPlotsData)
        context.patchState({
            plotsData: trimmedPlotsData
        })
    }
    @Action(AddDataToRerender)
    reRenderPlot(context: StateContext<PlotsStateModel>, action: AddDataToRerender) {
        context.patchState({
            dataToRerender: action.dataToRerender
        })
    }

}
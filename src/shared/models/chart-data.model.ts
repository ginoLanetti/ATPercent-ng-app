import { PlotDataModel } from './plot-data.model';

export class ChartDataModel {
    public name: string;
    public plotsData: Array<PlotDataModel>;

    constructor(name: string, plotsData: Array<PlotDataModel>) {
        this.name = name;
        this.plotsData = plotsData;
    }
}

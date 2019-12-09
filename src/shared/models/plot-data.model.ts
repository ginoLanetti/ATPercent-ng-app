export class PlotDataModel {
    public plotName?: string;
    public name: string;
    public type: string;
    public showInLegend: boolean;
    public markerSize: number;
    public dataPoints: Array<object>;

    constructor(plotData: PlotDataModel, plotName?:string) {
        this.plotName = plotName
        this.name = plotData.name;
        this.type = 'spline';
        this.showInLegend = true;
        this.markerSize = 0;
        this.dataPoints = plotData.dataPoints;

    }

}

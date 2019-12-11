export class PlotDataModel {
    public name: string;
    public type: string;
    public showInLegend: boolean;
    public markerSize: number;
    public dataPoints: Array<object>;

    constructor(plotData: PlotDataModel) {
        this.name = plotData.name;
        this.type = 'spline';
        this.showInLegend = true;
        this.markerSize = 0;
        this.dataPoints = plotData.dataPoints;

    }
}

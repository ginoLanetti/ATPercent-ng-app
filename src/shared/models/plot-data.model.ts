export class PlotDataModel {
    public name: string;
    public type: string;
    public showInLegend: boolean;
    public markerSize: number;
    public dataPoints: Array<object>;

    constructor(name: string, dataPoints: Array<object>) {
        this.name = name;
        this.type = 'spline';
        this.showInLegend = true;
        this.markerSize = 0;
        this.dataPoints = dataPoints;
    }
}

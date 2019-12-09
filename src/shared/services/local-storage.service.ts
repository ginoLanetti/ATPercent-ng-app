import { PlotDataModel } from '../models/plot-data.model'
import { ChartDataModel } from '../models/chart-data.model'

export const setInLocalStorage = (key: string, value: ChartDataModel[]) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key))
}
import { PlotDataModel } from '../models/plot-data.model'

export const setInLocalStorage = (key: string, value: PlotDataModel[][]) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key))
}
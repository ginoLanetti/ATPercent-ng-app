import { SequenceDataModel } from '../models/sequence-data.model'

export const getFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key))

}

export const setInLocalStorage = (key: string, value: SequenceDataModel[]) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
import {URLS} from './constants'
import { putData, deleteData } from './requests';
import {formatDate} from './helpers'

export function handleSaveTraining (payloads, callback) {
    payloads.date = formatDate(payloads.date)
    putData(URLS.trainings, payloads, callback).then(()=>{
        callback();
    })
}
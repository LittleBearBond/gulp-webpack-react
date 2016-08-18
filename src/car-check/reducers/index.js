
import {UPDATE} from '../actions'

/**
 * 
 * 
 * @export
 * @param {any} action
 */
export default function CarList(state = [
    {
        id: 0,
        text: 'test'
    }
], action) {
    switch (action.type) {
        case UPDATE:
            return action.data;
        default:
            return state;
    }
}
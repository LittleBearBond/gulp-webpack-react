
/** 
 * 
 */
export const UPDATE = 'UPDATE'
/**
 * 
 * 
 * @export
 * @returns
 */
export function UpdateView(data) {
    return {
        type: UPDATE,
        data: data
    }
}
export const addData = (data) => {
    return {
        type: 'ADD_DATA',
        payload:{
            id: new Date().getTime().toString(),
            data: data
        }
    }
}
export const deleteData = () => {
    return {
        type: 'DELETE_DATA',
    }
}
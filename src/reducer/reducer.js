const initialData = {
    list: [],
}
// console.log(initialData);

const dataReducer = (state = initialData, action) => {

    // console.log("State", state);

    switch (action.type) {
        case "ADD_DATA":
            const { id, data } = action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        data: data
                    }
                ]
            }

        case "DELETE_DATA":
            // const { id, data } = action.payload;
            // const newList = state.list.filter((items) => items.id !== action.id)
            
            return {
                ...state,
                list: action.payload
            }
        default: return state;
    }
}

export default dataReducer;
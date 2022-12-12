const initialData = {
    list: [],
}
console.log(initialData);

const dataReducer = (state = initialData, action) => {

    console.log("State", state);

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
        default: return state;
    }
}

export default dataReducer;
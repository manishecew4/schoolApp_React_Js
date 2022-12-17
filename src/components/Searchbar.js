import React, { useState, useEffect, useMemo } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux'
import { deleteData } from '../action/index'
import { useDispatch } from 'react-redux'

function Searchbar() {
    // const [searchData, setSearchData] = useState('')
    const [searchField, setSearchField] = useState("");

    const list = useSelector((state) => state.dataReducer.list)

    const listMemo = useMemo(() => list, [list]);

    console.log("List Memo", listMemo);



    const searchQuery = (e) => {
        // // const element = e.target.value;
        // // console.log("element", element);
        // const searchRes = listMemo.filter(e => e.firstName === element);
        // console.log("searchRes", searchRes);

        setSearchField(e.target.value);
    }

    const filteredPersons = listMemo.filter(
        element => {
            return (
                element
                    .firstName
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                    element
                    .lastName
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
      };


    return (
        <div className="form-control searchWrap d-flex aic p-0">

            <input type="text" className="searchbar py-2" placeholder="Search users" onChange={(e) => searchQuery(e)} />

            <div className="searchIconWrap d-flex jcc aic">
                <SearchIcon />
            </div>
        </div>
    )
}

export default Searchbar
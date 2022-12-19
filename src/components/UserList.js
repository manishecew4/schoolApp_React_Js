import React, { useEffect, useState, useMemo } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSelector } from 'react-redux'
import { deleteData } from '../action/index'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchBar from "material-ui-search-bar";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


function UserList() {

    const [listData, setListData] = useState();
    const [open, setOpen] = React.useState(false);
    const [selectItem, setSelectItem] = useState({});
    const [searched, setSearched] = useState("");
    const mainlist = useSelector((state) => state.dataReducer.list)
    const requestSearch = (searchedVal) => {
        if (searchedVal.length > 0) {
            const filteredRows = listData.filter((row) => {
                let name = row.data.firstName + " " + row.data.lastName;
                return name.toLowerCase().includes(searchedVal.toLowerCase());
            });

            setListData(filteredRows);
        } else {
            setListData(mainlist);
        }


    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };


    const list = useSelector((state) => state.dataReducer.list)

    const listMemo = useMemo(() => list, [list]);

    const dispatch = useDispatch()

    useEffect(() => {

        setListData(listMemo);

    }, [listMemo])


    const handleOpen = () => {
        setOpen(true);

    };


    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 24,
        p: 4,
    };


    const deleteDataFunction = (id) => {
        let temp = [];
        listData.forEach(element => {
            if (element.id !== id) {
                temp.push(element);
            }
        });
        dispatch(deleteData(temp));
    }

    return (
        <div className="customContainer shadow-sm mt-2">
            <div className="d-flex jcsb aic mb-3 py-1 customContainer">
                <div></div>
                <SearchBar
                    className="w-40"
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
                <Link className="td_none" to="/Admission">
                    <button variant="contained" className="btn btn-primary">Add User</button>
                </Link>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead className="bgLight">
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell >Gender</TableCell>
                            <TableCell >Phone Number</TableCell>
                            <TableCell >Email Id</TableCell>
                            <TableCell >Last Pursued Class</TableCell>
                            <TableCell >Want To Pursue</TableCell>
                            <TableCell >Address</TableCell>
                            <TableCell >Country</TableCell>
                            <TableCell >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            listData?.map((items) => {
                                const item = items.data;

                                return (
                                    <TableRow key={items.id}>
                                        <TableCell>{item.firstName} {item.lastName}</TableCell>
                                        <TableCell>{item.gender}</TableCell>
                                        <TableCell>{item.phoneNo}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.prevClass}</TableCell>
                                        <TableCell>{item.nextClass}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.country}</TableCell>
                                        <TableCell>
                                            <RemoveRedEyeIcon
                                                className="view"
                                                onClick={() => {
                                                    setSelectItem(items)
                                                    handleOpen()
                                                }}
                                            />
                                            <DeleteIcon
                                                className="delete"
                                                onClick={() => deleteDataFunction(items.id)}
                                            />
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            {open && selectItem ?<Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CloseIcon className="closeModal" onClick={handleClose} />
                    <div className="d-flex flex-column aic">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectItem.data.firstName} {selectItem.data.lastName}
                        </Typography>
                        <Typography className="mt-0" id="modal-modal-description" sx={{ mt: 2 }}>
                            {selectItem.data.email}
                        </Typography>
                        <Typography className="mt-0" id="modal-modal-description" sx={{ mt: 2 }}>
                            {selectItem.data.phoneNo}
                        </Typography>
                    </div>
                    <p className="mb-0 d-flex aic">
                        Gender : {selectItem.data.gender}
                    </p>
                    <p className="mb-0 d-flex aic">
                        Previous Class :  {selectItem.data.prevClass}
                    </p>
                    <p className="mb-0 d-flex aic">
                        Next Class :  {selectItem.data.nextClass}
                    </p>
                    <p className="mb-0 d-flex aic">
                        Address : {selectItem.data.address}
                    </p>
                    <p className="mb-0 d-flex aic">
                        Country : {selectItem.data.country}
                    </p>
                    <div className="d-flex">
                        <DeleteIcon
                            className="delete ms-auto"
                            onClick={() => {
                                deleteDataFunction(selectItem.id)
                                setOpen(false)
                            }}
                        />
                    </div>

                </Box>
            </Modal> : null}
        </div>
    )
}

export default UserList
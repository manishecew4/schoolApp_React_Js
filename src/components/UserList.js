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


function UserList() {

    const [listData, setListData] = useState();
    const [open, setOpen] = React.useState(false);


    const list = useSelector((state) => state.dataReducer.list)

    const listMemo = useMemo(() => list, [list]);

    console.log("list", list);
    console.log("listMemo", listMemo);

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("List", list);
        // if (listMemo?.length) {
        setListData(listMemo);
        // }
        console.log("List Data", listData);
    }, [listMemo])
    console.log("Updated", listData);

    const handleOpen = () => {
        setOpen(true)
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
        console.log("ID", id);
        let temp = [];
        listData.forEach(element => {
            console.log("element", element);
            if (element.id !== id) {
                temp.push(element);
            }
        });
        dispatch(deleteData(temp));
        console.log("temp", temp);
    }

    return (
        <div className="customContainer shadow-sm mt-2">
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
                                        <TableCell>1234567890</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.prevClass}</TableCell>
                                        <TableCell>{item.nextClass}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{item.country}</TableCell>
                                        <TableCell>
                                            <RemoveRedEyeIcon
                                                className="view"
                                                onClick={() => {
                                                    handleOpen()
                                                    setOpen(items.id)
                                                }}
                                            />
                                            <DeleteIcon
                                                className="delete"
                                                onClick={() => deleteDataFunction(items.id)}
                                            />
                                        </TableCell>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    {item.firstName} {item.lastName}
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    {item.email}
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    {item.address}
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    {item.country}
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default UserList
import React, { useEffect, useState, useMemo } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sampleData } from '../utils/constant'
import { useSelector } from 'react-redux'
import { addData, deleteData } from '../action/index'
import { useReactTable } from '@tanstack/react-table'

function Applicants() {

    const [listData, setListData] = useState();

    const list = useSelector((state) => state.dataReducer.list)

    const listMemo = useMemo(() => list, []);

    useEffect(() => {
        console.log("List", list);
        setListData(listMemo)

        // setListData(...list, listData);
        console.log("List Data", listData);
    }, [])

    return (
        <div className="main">
            <div className="d-flex jcc py-1">
                <h2>Applicants</h2>
            </div>
            <div className="customContainer shadow-sm mt-2">
                {/* <TableContainer component={Paper}>
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
                                    console.log("items", items);
                                    const item = items.data;
                                    console.log("item", item);
                                    console.log("address", item.address);

                                    <TableRow key={items.id}>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                        <TableCell>Test Input</TableCell>
                                    </TableRow>
                                })}
                        </TableBody>
                    </Table>
                </TableContainer> */}

                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listData?.map((data) => {
                                const item = data.data;
                                console.log("firstName :", item.firstName);
                                console.log("lastName :", item.lastName);
                                console.log("gender", item.gender);
                                <tr key={data.id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.gender}</td>
                                </tr>
                            })}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Applicants
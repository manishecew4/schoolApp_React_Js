import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { prevClassArr, nextClassArr, defaultValue, countryAPI } from '../utils/constant'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addData } from '../action/index';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Admission() {

    const [openSnack, setOpenSnack] = React.useState(false);
    const [openSnackEmail, setOpenSnackEmail] = React.useState(false);
    const [phoneNo, setPhoneNo] = useState('');
    const [countryList, setCountryList] = useState()
    const [prevClass, setPrevClass] = useState([...defaultValue, ...prevClassArr])
    const [nextClass, setNextClass] = useState([...defaultValue, ...nextClassArr]);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        nextClass: "",
        prevClass: "",
        address: "",
        date: "",
        country: "",
        phoneNo: "",
        email: ""
    })
    const [date, setDate] = useState(moment('2014-08-18T21:11:54'));

    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {

        fetchCountry()
    }, [setPrevClass, phoneNo])

    const fetchCountry = () => {
        fetch(countryAPI)
            .then(response => response.json())
            .then(res => {
                setCountryList(res);
            })
    }

    useEffect(() => {
        if (form.prevClass !== "") {

            if (nextClass?.length) {

                let tempNextClassArr = [];
                nextClassArr.forEach(element => {
                    if (element.value > form.prevClass) {
                        tempNextClassArr.push(element)
                    }
                });
                setNextClass([...defaultValue, ...tempNextClassArr])
            }
        }
    }, [form.prevClass, prevClass]);

    const handleSelectChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const phoneNumber = (e) => {
        setPhoneNo(e)
        setForm({
            ...form,
            phoneNo: e
        })
    }
    const selectDate = (e) => {
        setDate(e)
        let con_date = moment(e._i).format('MM/DD/YYYY');
        setForm({
            ...form,
            date: con_date
        })
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const saveForm = () => {
        let { firstName, lastName, gender, nextClass, prevClass, address, date, country, phoneNo, email } = form;
        if (firstName && lastName && gender && nextClass && prevClass && address && date && country && phoneNo && email) {

            if (!validateEmail(email)) {
                setOpenSnackEmail(true);
                return;
            }
            dispatch(addData(form));
            history("/Applicants");

        }
        else {
            setOpenSnack(true)
        }


    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    return (
        <div className="main p-5">
            <div className="d-flex"></div>
            <div className="container d-flex jcsb aic flex-wrap shadow-sm p-5">
                <TextField className="inputs" name="firstName" onChange={(e) => handleSelectChange(e)} id="outlined-basic" label="First name" variant="outlined" />

                <TextField className="inputs" name="lastName" onChange={(e) => handleSelectChange(e)} id="outlined-basic" label="Last name" variant="outlined" />

                <FormControl className="inputs">
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.gender}
                        name="gender"
                        label="Gender"
                        onChange={(e) => handleSelectChange(e)}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="inputs">
                    <InputLabel id="demo-simple-select-label">Last pursued Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.prevClass}
                        name="prevClass"
                        label="Last pursued Class"
                        onChange={(e) => handleSelectChange(e)}
                    >
                        {prevClass?.length && prevClass?.map((item, idx) =>
                            <MenuItem key={idx} value={item?.value}>{item?.name}</MenuItem>
                        )
                        }

                    </Select>
                </FormControl>

                <FormControl className="inputs">
                    <InputLabel id="demo-simple-select-label">Want to pursue</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.nextClass}
                        name="nextClass"
                        label="Want to pursue"
                        onChange={(e) => handleSelectChange(e)}
                    >
                        {
                            nextClass?.length && nextClass?.map((item, idx) =>
                                <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>

                <div className="inputs">
                    <PhoneInput
                        defaultCountry="IN"
                        className="phoneNumber"
                        placeholder="Enter phone number"
                        value={phoneNo}
                        name="phoneNo"
                        onChange={(e) => phoneNumber(e)}
                    />
                </div>

                <FormControl className="inputs">
                    <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={form.country}
                        name="country"
                        label="Select Country"
                        onChange={(e) => handleSelectChange(e)}
                    >
                        {
                            countryList?.map((item, idx) =>
                                <MenuItem key={idx} value={item.name.common}>{`${item.cca2} - ${item.name.common}`}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>

                <TextField className="inputs" name="email" onChange={(e) => handleSelectChange(e)} id="outlined-basic" label="Email" variant="outlined" />

                <div className="inputs overHidden">
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Address"
                        className="textArea"
                        name="address"
                        onChange={(e) => handleSelectChange(e)}
                    />
                </div>

                <div className="inputs">
                    <LocalizationProvider dateAdapter={AdapterMoment} className="w-100">
                        <DatePicker
                            label="Select Date"
                            className="w-100"
                            value={date}
                            inputFormat="DD/MM/YYYY"
                            onChange={(e) => selectDate(e)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="d-flex w-100">
                    <Button variant="outlined" onClick={saveForm}>Save</Button>
                </div>
            </div>
            <Snackbar open={openSnack} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Please fill all fields.
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackEmail} autoHideDuration={1000}>
                <Alert severity="warning" sx={{ width: '100%' }}>
                    Email is not valid
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Admission
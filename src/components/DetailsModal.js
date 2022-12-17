// import React from 'react'
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

// function DetailsModal() {

//     const [open, setOpen] = React.useState(false);


//     const handleOpen = () => {
//         setOpen(true)
//     };

//     const handleClose = () => setOpen(false);

//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         borderRadius: 1,
//         boxShadow: 24,
//         p: 4,
//     };


//     return (
//         <div></div>
//         // <Modal
//         //     open={open}
//         //     onClose={handleClose}
//         //     aria-labelledby="modal-modal-title"
//         //     aria-describedby="modal-modal-description"
//         // >
//         //     <Box sx={style}>
//         //         <Typography id="modal-modal-title" variant="h6" component="h2">
//         //             {item.firstName} {item.lastName}
//         //         </Typography>
//         //         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//         //             {item.email}
//         //         </Typography>
//         //         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//         //             {item.address}
//         //         </Typography>
//         //         <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//         //             {item.country}
//         //         </Typography>
//         //     </Box>
//         // </Modal>
//     )
// }

// export default DetailsModal
import React from 'react';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from "@mui/icons-material/Cancel";
import useTheme from "@mui/material/styles/useTheme";
import {useMediaQuery} from "@mui/material";

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:'2002'
};



const closeButtonStyle = {
    backgroundColor:'Transparent',
    border:'none',
    position: 'absolute',
    top: '4px',
    right: '4px',
    padding: '8px'
};

//Popup modal to show unavailable items and total price of available items,
// customer can proceed to checkout with available items or cancel the order
const PopupModal = ({ data,unavailableItems, isOpen, close, finalPrice,payBills }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const ModalWidth = isSmallScreen ? "80%" : "500px";
    const ModalHeight = isSmallScreen ? "40%" : "500px";
    const modalContentStyle = {
        backgroundColor: 'rgb(225,218,218)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        outline: 'none',
        width: ModalWidth,
        height:ModalHeight,
        alignItems: 'center',
        borderRadius: '15px'
    };
    const handleNavigate = () => {
        close();
        payBills(finalPrice);
    };
    function getNameByItemId(itemId){
        const item= data.find(item=> item.id ===itemId);
        return item? item.name: null;
    }


    return (
        <Modal
            open={isOpen}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={modalStyle}

        >
            <div style={modalContentStyle}>

                <div>
                    <p>The following items are not in stock:</p>
                    <table style={{borderCollapse: 'collapse', width: '100%', backgroundColor: "rgb(167,179,193)", borderRadius:"10px"}}>
                        <thead >
                        <tr  >
                            <th style={{backgroundColor:"transparent"}}>Item</th>
                            <th style={{backgroundColor:"transparent"}}>Available Stock</th>
                        </tr>
                        </thead>
                        <tbody>
                        {unavailableItems.map(item => (
                            <tr key={item.itemId}>
                                <td>{getNameByItemId(item.itemId)}</td>
                                <td>{item.stock}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <button style={closeButtonStyle} onClick={close}>
                    <CancelIcon sx={{fontSize: 36, color: 'black'}}/>
                </button>

                <Typography variant="h6" marginTop="30px">
                    Total Price of Available Items: Rs {finalPrice}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigate}
                    style={{ marginTop: 'auto' }}
                >
                    Proceed to checkout with available items.
                </Button>
            </div>
        </Modal>
    );
};

export default PopupModal;

import React from 'react';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from "@mui/icons-material/Cancel";
import payBills from './payBills.jsx';
const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:'2002'
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    outline: 'none',
    width: '500px',
    height: '500px'
};

const closeButtonStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '8px'
};

const PopupModal = ({ data,unavailableItems, isOpen, close, finalPrice }) => {

    const handleNavigate = () => {
        close();
        payBills();
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
                    <ul>
                        {unavailableItems.map(item => (
                            <li key={item.itemId}>{getNameByItemId(item.itemId)}</li>
                        ))}
                    </ul>
                </div>
                <Typography variant="h6" color="primary">
                    Total Price of Available Items: ${finalPrice}
                </Typography>
                <button style={closeButtonStyle} onClick={close}>
                    <CancelIcon sx={{ fontSize: 36, color: 'white' }} />
                </button>
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

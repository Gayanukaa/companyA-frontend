import React from 'react';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const modalContentStyle = {
    backgroundImage: `url('https://t3.ftcdn.net/jpg/02/57/16/84/360_F_257168460_AwhicdEIavp7bdCbHXyTaBTHnBoBcZad.jpg')`,
    backgroundSize: 'cover',
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
    backgroundColor:'Transparent',
    border:'none',
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '8px'
};

const PopupModal = ({ isOpen, close }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        close();
        navigate('/customer/existingproducts');
    };

    return (
        <Modal
            open={isOpen}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={modalStyle}

        >
            <div style={modalContentStyle}>
                <button style={closeButtonStyle} onClick={close}>
                    <CancelIcon sx={{ fontSize: 36, color: 'white' }} />
                </button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigate}
                    style={{ marginTop: 'auto' }}
                >
                    Browse existing products
                </Button>
            </div>
        </Modal>
    );
};

export default PopupModal;

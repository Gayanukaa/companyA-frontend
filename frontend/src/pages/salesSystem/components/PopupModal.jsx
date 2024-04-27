import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';

const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:'2002'
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

const PopupModal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true); // Set initial state to true
    useEffect(() => {
        document.body.classList.add('overflow-hidden');
    }, []);
    const closePopup = () => {
        setIsOpen(false);
        document.body.classList.remove('overflow-hidden');

    };
    const handleNavigate = () => {
        closePopup();
        navigate('/sales-management/existingproducts');
    };

    return (
        <Modal
            open={isOpen}
            onClose={closePopup}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={modalStyle}
        >
            <div style={modalContentStyle} >
                <button style={closeButtonStyle} onClick={closePopup}>
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

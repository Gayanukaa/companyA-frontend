import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import {useMediaQuery} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import popup from '../../../assets/popup.jpg';
const modalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:'2002',

};



const closeButtonStyle = {
    backgroundColor:'Transparent',
    border:'none',
    position: 'absolute',
    top: '4px',
    right: '4px',
    padding: '8px'
};

const PopupModal = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const ModalWidth = isSmallScreen ? "80%" : "500px";
    const ModalHeight = isSmallScreen ? "40%" : "500px";
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
        navigate('/customer/existingproducts');
    };
    const modalContentStyle = {
        backgroundImage: `url(${popup})`,
        backgroundSize: 'cover',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        outline: 'none',
        width: ModalWidth,
        height:ModalHeight,

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
                <div style={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    borderRadius: '8px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: "rgb(255,255,255,0.8)", // Transparent gray background
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    textAlign: 'center',
                    width:"60%",
                    height:"50%"
                    }}>

                    Shop Ready-Made products

            </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={handleNavigate}
                    style={{ width:"60%",
                        marginTop: 'auto' }}
                >
                    Browse
                </Button>
            </div>
        </Modal>
    );
};

export default PopupModal;

import React, { useState } from "react";
import Swal from 'sweetalert2';
import { defaultReq } from '../../global/reqSender.jsx';

const LoanForm = ({ formData, handleChange, handleAdd, styles }) => {
    const [isHoveredAdd, setIsHoveredAdd] = useState(false);
    const [isActiveAdd, setIsActiveAdd] = useState(false);

    const handleMouseEnterAdd = () => {
        setIsHoveredAdd(true);
    };

    const handleMouseLeaveAdd = () => {
        setIsHoveredAdd(false);
    };

    const handleMouseDownAdd = () => {
        setIsActiveAdd(true);
    };

    const handleMouseUpAdd = () => {
        setIsActiveAdd(false);
    };

    const buttonStyle = {
        marginTop: '10px',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        outline: 'none',
        transition: 'background-color 0.3s ease',
    };

    return (
        <form style={styles.form}>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Facility ID:</label>
                <input type="text" name="facilityId" value={formData.facilityId} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Bank:</label>
                <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Loan Amount:($)</label>
                <input type="integer" name="initialLoanAmount" value={formData.initialLoanAmount} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Interest Rate:(%)</label>
                <input type="integer" name="interestRate" value={formData.interestRate} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Loan Term in Months:</label>
                <input type="integer" name="loanTermInMonths" value={formData.loanTermInMonths} onChange={handleChange} style={styles.input} />
            </div>
            
            {/* Add button */}
            <button
                type="button"
                onClick={handleAdd}
                style={{
                    ...buttonStyle,
                    ...styles.button,
                    backgroundColor: isActiveAdd ? '#004080' : (isHoveredAdd ? '#0056b3' : '#007bff'),
                    color: '#fff',
                    border: 'none',
                }}
                onMouseEnter={handleMouseEnterAdd}
                onMouseLeave={handleMouseLeaveAdd}
                onMouseDown={handleMouseDownAdd}
                onMouseUp={handleMouseUpAdd}
            >
                Add
            </button>
        </form>
    );
};

const AddLoanForm = () => {
    const [formData, setFormData] = useState({
        facilityId: '',
        bankName: '',
        initialLoanAmount: '',
        interestRate: '',
        loanTermInMonths: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAdd = () => {
        if (isFormValid()) {
            // Handle add operation
            defaultReq('POST', 'api/createLoan', formData, handleResponse);
        } else {
            Swal.fire({ title: 'Error!', text: 'Please fill in all fields.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value.trim() !== '');
    };

    const handleResponse = (response) => {
        if (response.status === 200) {
            // Success message
            Swal.fire({ title: 'Success!', text: 'Loan details added successfully.', icon: 'success', confirmButtonText: 'OK' });
            // Clear form fields
            clearFormFields();
        } else {
            // Handle error response
            Swal.fire({ title: 'Error!', text: 'Failed to add loan details.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    const clearFormFields = () => {
        setFormData({
            facilityId: '',
            bankName: '',
            initialLoanAmount: '',
            interestRate: '',
            loanTermInMonths: ''
        });
    };

    const styles = {
        form: {
            padding: '50px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        inputContainer: {
            marginBottom: '15px',
        },
        label: {
            marginRight: '10px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            outline: 'none',
        },
    };

    return (
        <>
            <div className="left">
                <h2 style={{ fontWeight: 600, padding: '30px' }}>Add Loan Details</h2>
            </div>
            <LoanForm
                formData={formData}
                handleChange={handleChange}
                handleAdd={handleAdd}
                styles={styles} // Pass styles object as prop
            />
        </>
    );
};

export default AddLoanForm;


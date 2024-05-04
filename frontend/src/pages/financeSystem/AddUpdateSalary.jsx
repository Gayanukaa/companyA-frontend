import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { defaultReq } from '../../global/reqSender.jsx';

const SalaryForm = ({ formData, handleChange, handleAdd, handleUpdate, styles }) => {
    const [isHoveredAdd, setIsHoveredAdd] = useState(false);
    const [isActiveAdd, setIsActiveAdd] = useState(false);
    const [isHoveredUpdate, setIsHoveredUpdate] = useState(false);
    const [isActiveUpdate, setIsActiveUpdate] = useState(false);

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

    const handleMouseEnterUpdate = () => {
        setIsHoveredUpdate(true);
    };

    const handleMouseLeaveUpdate = () => {
        setIsHoveredUpdate(false);
    };

    const handleMouseDownUpdate = () => {
        setIsActiveUpdate(true);
    };

    const handleMouseUpUpdate = () => {
        setIsActiveUpdate(false);
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
                <label style={styles.label}>Employee ID:</label>
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Basic Salary:($)</label>
                <input type="integer" name="basicSalary" value={formData.basicSalary} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Pay for OT Hour:($)</label>
                <input type="integer" name="payForOtHour" value={formData.payForOtHour} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>OT Hours:</label>
                <input type="integer" name="otHours" value={formData.otHours} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Number of Absent Days:</label>
                <input type="integer" name="numberOfAbsentDays" value={formData.numberOfAbsentDays} onChange={handleChange} style={styles.input} />
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
                    marginRight: '10px'
                }}
                onMouseEnter={handleMouseEnterAdd}
                onMouseLeave={handleMouseLeaveAdd}
                onMouseDown={handleMouseDownAdd}
                onMouseUp={handleMouseUpAdd}
            >
                Add
            </button>

            {/* Update button */}
            <button
                type="button"
                onClick={handleUpdate}
                style={{
                    ...buttonStyle,
                    ...styles.button,
                    backgroundColor: isActiveUpdate ? '#004080' : (isHoveredUpdate ? '#0056b3' : '#007bff'),
                    color: '#fff',
                    border: 'none'
                }}
                onMouseEnter={handleMouseEnterUpdate}
                onMouseLeave={handleMouseLeaveUpdate}
                onMouseDown={handleMouseDownUpdate}
                onMouseUp={handleMouseUpUpdate}
            >
                Update
            </button>
        </form>
    );
};

const AddOrUpdateEmployeeSalary = ({ initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData || {
        employeeId: '',
        basicSalary: '',
        payForOtHour: '',
        otHours: '',
        numberOfAbsentDays: ''
    });

    useEffect(() => {
        if (initialFormData) {
            // Set form data if initial data is provided (for updating)
            setFormData(initialFormData);
        }
    }, [initialFormData]);

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
            defaultReq('POST', 'api/SaveEmployeeSalary', formData, handleResponse);
        } else {
            Swal.fire({ title: 'Error!', text: 'Please fill in all fields.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    const handleUpdate = () => {
        if (isFormValid()) {
            // Handle update operation
            defaultReq('PUT', 'api/updateSalary', formData, handleUpdateResponse);
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
            Swal.fire({ title: 'Success!', text: 'Employee salary details added successfully.', icon: 'success', confirmButtonText: 'OK' });
            // Clear form fields
            clearFormFields();
        } else {
            // Handle error response
            Swal.fire({ title: 'Error!', text: 'Failed to add employee salary details.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    const handleUpdateResponse = (response) => {
        if (response.status === 200) {
            // Success message
            Swal.fire({ title: 'Success!', text: 'Employee salary details updated successfully.', icon: 'success', confirmButtonText: 'OK' });
            // Clear form fields
            clearFormFields();
        } else {
            // Handle error response
            Swal.fire({ title: 'Error!', text: 'Failed to update employee salary details.', icon: 'error', confirmButtonText: 'OK' });
        }
    };

    const clearFormFields = () => {
        setFormData({
            employeeId: '',
            basicSalary: '',
            payForOtHour: '',
            otHours: '',
            numberOfAbsentDays: ''
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
                <h2 style={{ fontWeight: 600, padding: '30px' }}>Add/Update Employee Salary Details</h2>
            </div>
            <SalaryForm
                formData={formData}
                handleChange={handleChange}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                styles={styles} // Pass styles object as prop
            />
        </>
    );
};

export default AddOrUpdateEmployeeSalary;
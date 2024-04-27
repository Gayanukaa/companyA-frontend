import React, {useContext, useState} from 'react';
import TableComp from '../../../components/sideComps/TableComp';
import {logisticsAndMaintenanceContext} from "../context/logisticsAndMaintenanceContext.jsx";
import {Box, Button, FormControl, Input, InputLabel, Modal, Typography} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


export function ViewStocks(props) {
    const {
        machinery,
        vehicle,
        technician,
        vendor,
        serviceMaintenance,
        deleteMachine,
        deleteTechnician,
        deleteVendor,
        addMachine,
        addTechnician,
        addVendor,
        deleteVehicle,
        addVehicle
    } = useContext(logisticsAndMaintenanceContext);

    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const [machineryForm, setMachineryForm] = useState({
        machineId: "",
        machineName: "",
        machineModel: 0,
        currentJob: "",
        machineStatus: true,
        maintenance: []
    });

    const [technicianForm, setTechnicianForm] = useState({
        technicianId: "",
        name: "",
        specialty: "",
        yearsOfExperience: 0,
        availability: true,
        currentJob: ""
    });

    const [vendorForm, setVendorForm] = useState({
        vendorId: "",
        name: "",
        contactNumber: "",
        address: "",
        email: "",
        vendorItems: []
    });

    const [vehicleForm, setVehicleForm] = useState({
        vehicleId: "",
        model: 0,
        location: "",
        vehicleStatus: true,
        maintenanceDate: "",
        fuelLevel: ""
    });


    const handleMachineryForm = (name, value) => {
        setMachineryForm({
            ...machineryForm,
            [name]:value
        })
    }

    const handleTechnicianForm = (e) => {
        setTechnicianForm({
            ...technicianForm,
            [e.target.name]: e.target.value
        })
    }

    const handleVendorForm = (e) => {
        setVendorForm({
            ...vendorForm,
            [e.target.name]: e.target.value
        })
    }

    const handleVehicleForm = (e) => {
        setVehicleForm({
            ...vehicleForm,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (props.data === "machinery") {
            addMachine(machineryForm);
            setOpenAdd(false)
        }
        if (props.data === "technician") {
            addTechnician(technicianForm);
        }
        if (props.data === "vendor") {
            addVendor(vendorForm);
        }
        if (props.data === "vehicle") {
            addVehicle(vehicleForm);
        }
        // window.location.href = "/logistic-management/dashboard";
    }

    let data = []
    switch (props.data) {
        case "machinery":
            data = machinery;
            break;
        case "vehicle":
            data = vehicle;
            break;
        case "technician":
            data = technician;
            break;
        case "vendor":
            data = vendor;
            break;
        case "serviceMaintenance":
            data = serviceMaintenance;
            break;
        default:
            data = machinery;
            break;
    }

    const deleteData = (id, data) => {
        if (data === "machinery") {
            deleteMachine(id);
        }
        if (data === "technician") {
            deleteTechnician(id);
        }
        if (data === "vendor") {
            deleteVendor(id);
        }
        if (data === "vehicle") {
            deleteVehicle(id);
        }
        window.location.href = "/logistic-management/dashboard";
    }

    const getHeading = (data) => {
        const keys = Object.keys(data || {});
        const heading = [];
        keys.forEach(key => {
            heading.push(key);
        })
        // remove first element
        heading.shift();
        heading.push("action");
        console.log(heading);
        return heading;
    }


    const tableData = {
        name: "",
        heading: [],
        body: []
    }
    tableData.name = props.data.toUpperCase();
    tableData.heading = getHeading(data[0]);
    tableData.body = data.map((data, index) => {
        const keys = Object.keys(data);
        keys.shift();
        return (
            <tr key={index}>
                {keys.map((key, index) => {
                    if (key === "machineStatus" || key === "availability" || key === "vehicleStatus") {
                        return (
                            <td key={index}>{data[key] ? "Active" : "Inactive"}</td>
                        )
                    }
                    if(key === "maintenance" || key === "vendorItems"){
                        return (
                            <td key={index}>{data[key].map((item,index)=>{
                                return(
                                    <p key={index}>{item}</p>
                                )
                            })}</td>
                        )
                    }
                    return (
                        <td key={index}>{data[key]}</td>
                    )
                })}
                <td>
                    {/*<Button variant="contained">Edit</Button>*/}
                    <Button variant="contained" color="error" onClick={() =>
                        deleteData(props.data === "machinery" ?
                            data.machineId : props.data === "vehicle" ?
                                data.vehicleId : props.data === "technician" ?
                                    data.technicianId : props.data === "vendor" ?
                                        data.vendorId : data.serviceMaintenanceId, props.data)}
                    >Delete</Button>
                </td>
            </tr>
        )
    })


    const mtableData = {
        name: "Sample Table",
        heading: ["Column 1", "Column 2", "Column 3"],
        body: [
            <tr key="row1">
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
            </tr>,
            <tr key="row2">
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
            </tr>,
            // Add more rows as needed
        ],
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <main>
                <div className="head-title">
                    <div className="left">
                        <h1>View Stocks</h1>
                    </div>
                    <Button variant="contained" onClick={handleOpenAdd}>Add {props.data}</Button>
                    <TableComp data={tableData}/>

                </div>

                <Modal open={openAdd} onClose={handleCloseAdd}>
                    <form onSubmit={handleOnSubmit}>
                        {props.data === "machinery" ?
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add Machinery
                                </Typography>
                                <Input t placeholder="Machine Id" name="machineId" onChange={(e) => handleMachineryForm(e.target.name, e.target.value)}/>
                                <Input placeholder="Machine Name" name="machineName" onChange={(e) => handleMachineryForm(e.target.name, e.target.value)}/>
                                <Input type="number" placeholder="Machine Model" name="machineModel"
                                       onChange={(e) => handleMachineryForm(e.target.name, parseInt(e.target.value || 0))}/>
                                <Input placeholder="Current Job" name="currentJob" onChange={(e) => handleMachineryForm(e.target.name, e.target.value)}/>

                                <FormControl variant={"standard"} sx={{ minWidth: "170px"}}>
                                    <InputLabel>Machine Status</InputLabel>

                                    <Select label={"Machine Satatus"} name="machineStatus" placeholder={"Machine Status"} onChange={(e) =>  handleMachineryForm(e.target.name, e.target.value == 'Active')}>
                                        <MenuItem value={"Active"}>Active</MenuItem>
                                        <MenuItem value={"Inactive"}>Inactive</MenuItem>
                                    </Select>
                                </FormControl>

                                <Input placeholder="Maintenance" name="maintenance" onChange={(e) => {
                                    let values = e.target.value?.split(",").map(v => v.trim())
                                    handleMachineryForm(e.target.name, values)
                                }}/>
                                <Button variant="contained" type="submit">Add</Button>
                            </Box>
                            : props.data === "technician" ?
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add Technician
                                    </Typography>
                                    <Input placeholder="Technician Id" name="technicianId"
                                           onChange={handleTechnicianForm}/>
                                    <Input placeholder="Technician Name" name="name" onChange={handleTechnicianForm}/>
                                    <Input placeholder="Speciality" name="specialty" onChange={handleTechnicianForm}/>
                                    <Input placeholder="Years of Experience" name="yearsOfExperience"
                                           onChange={handleTechnicianForm}/>
                                    <Input placeholder="Current Job" name="currentJob" onChange={handleTechnicianForm}/>
                                    <Input placeholder="Availability" name="availability"
                                           onChange={handleTechnicianForm}/>
                                    <Button variant="contained" type="submit">Add</Button>
                                </Box>
                                : props.data === "vendor" ?
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Add Vendor
                                        </Typography>
                                        <Input placeholder="Vendor Id" name="vendorId" onChange={handleVendorForm}/>
                                        <Input placeholder="Name" name="name" onChange={handleVendorForm}/>
                                        <Input placeholder="Contact Number" name="contactNumber"
                                               onChange={handleVendorForm}/>
                                        <Input placeholder="Address" name="address" onChange={handleVendorForm}/>
                                        <Input placeholder="Email" name="email" onChange={handleVendorForm}/>
                                        <Input placeholder="Vendor Items" name="vendorItems"
                                               onChange={handleVendorForm}/>
                                        <Button variant="contained" type="submit">Add</Button>
                                    </Box>
                                    : props.data === "vehicle" ?
                                        <Box sx={style}>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Add Vehicle
                                            </Typography>
                                            <Input placeholder="Vehicle Id" name="vehicleId"
                                                   onChange={handleVehicleForm}/>
                                            <Input placeholder="Model" name="model" onChange={handleVehicleForm}/>
                                            <Input placeholder="Location" name="location" onChange={handleVehicleForm}/>
                                            <Input placeholder="Vehicle Status" name="vehicleStatus"
                                                   onChange={handleVehicleForm}/>
                                            <Input placeholder="Maintenance Date" name="maintenanceDate"
                                                   onChange={handleVehicleForm}/>
                                            <Input placeholder="Fuel Level" name="fuelLevel"
                                                   onChange={handleVehicleForm}/>
                                            <Button variant="contained" type="submit">Add</Button>
                                        </Box>
                                        : null
                        }
                    </form>
                </Modal>

            </main>
        </>
    )
}
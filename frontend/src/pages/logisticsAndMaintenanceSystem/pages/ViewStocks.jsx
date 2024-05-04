import React, { useContext, useMemo, useState, useEffect } from "react";
import TableComp from "../../../components/sideComps/TableComp";
import { logisticsAndMaintenanceContext } from "../context/logisticsAndMaintenanceContext.jsx";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Modal,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export function ViewStocks(props) {
  const [reloadPage, setReloadPage] = useState(false); // State variable for triggering reload

  useEffect(() => {
    if (reloadPage) {
      window.location.reload(); // Reload the page when reloadPage state changes
    }
  }, [reloadPage]);

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
    addVehicle,
    addServiceMaintenance,
    deleteServiceMaintenance,
    updateServiceMaintenance,
    updateMachine,
    updateTechnician,
    updateVendor,
    updateVehicle,
  } = useContext(logisticsAndMaintenanceContext);

  // Rest of your code remains unchanged


  //techList
  const techList = technician;
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedTechId, setSelectedTechId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleTechSelect = (index, id) => {
    setSelectedTech(index);
    setSelectedTechId(id);
  };

  const handleTechAdd = (serviceId, technicianId) => {
    updateServiceMaintenance(serviceId, technicianId);
    setSelectedTech(null);
    setOpenTechList(false);
    setReloadPage(true);
  };

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openGenerateServiceReports, setOpenGenerateServiceReports] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openTechList, setOpenTechList] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [updateContext, setUpdateContext] = React.useState(null);

  const handleOpenTechList = (id) => {
    setOpenTechList(true);
    setSelectedServiceId(id);
  };
  const handleOpenAdd = () => setOpenAdd(true);
  const handleOpenGenerateServiceReports = () => setOpenGenerateServiceReports(true);
  const handleOpenUpdate = (dt) => {
    setOpenUpdate(true);
    setFormData(dt);

    if (dt.machineId) {
      setMachineryForm(dt);
      setUpdateContext("machinery");
    } else if (dt.technicianId) {
      setTechnicianForm(dt);
      setUpdateContext("technician");
    } else if (dt.vendorId) {
      setVendorForm(dt);
      setUpdateContext("vendor");
    } else if (dt.vehicleId) {
      setVehicleForm(dt);
      setUpdateContext("vehicle");
    }
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setOpenTechList(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [machineryForm, setMachineryForm] = useState({
    machineId: "",
    machineName: "",
    machineModel: 0,
    currentJob: "",
    machineStatus: true,
    maintenance: [],
  });

  const [technicianForm, setTechnicianForm] = useState({
    technicianId: "",
    name: "",
    specialty: "",
    yearsOfExperience: 0,
    availability: true,
    currentJob: "",
  });

  const [vendorForm, setVendorForm] = useState({
    vendorId: "",
    name: "",
    contactNumber: "",
    address: "",
    email: "",
    vendorItems: [],
  });

  const [vehicleForm, setVehicleForm] = useState({
    vehicleId: "",
    model: 0,
    location: "",
    vehicleStatus: true,
    maintenanceDate: "",
    fuelLevel: "",
  });

  const [serviceMaintenanceForm, setServiceMaintenanceForm] = useState({
    serviceId: "",
    serviceCost: 0,
    technicianId: "",
  });

  const handleMachineryForm = (name, value) => {
    setMachineryForm({
      ...machineryForm,
      [name]: value,
    });
  };

  const handleTechnicianForm = (name, value) => {
    setTechnicianForm({
      ...technicianForm,
      [name]: value,
    });
  };

  const handleVendorForm = (name, value) => {
    setVendorForm({
      ...vendorForm,
      [name]: value,
    });
  };

  const handleVehicleForm = (name, value) => {
    setVehicleForm({
      ...vehicleForm,
      [name]: value,
    });
  };
  const handleServiceMaintenanceForm = (name, value) => {
    setServiceMaintenanceForm({
      ...serviceMaintenanceForm,
      [name]: value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (updateContext === "machinery") {
      updateMachine(machineryForm.machineId, {
        machineId: machineryForm.machineId,
        machineName: machineryForm.machineName,
        machineModel: machineryForm.machineModel,
        currentJob: machineryForm.currentJob,
        machineStatus: machineryForm.machineStatus,
        maintenance: machineryForm.maintenance,
      });
    } else if (updateContext === "technician") {
      updateTechnician(technicianForm.technicianId, {
        technicianId: technicianForm.technicianId,
        name: technicianForm.name,
        specialty: technicianForm.specialty,
        yearsOfExperience: technicianForm.yearsOfExperience,
        availability: technicianForm.availability,
        currentJob: technicianForm.currentJob,
      });
    } else if (updateContext === "vendor") {
      updateVendor(vendorForm.vendorId, {
        vendorId: vendorForm.vendorId,
        name: vendorForm.name,
        contactNumber: vehicleForm.contactNumber,
        address: vendorForm.address,
        email: vendorForm.email,
        vendorItems: vehicleForm.vendorItems,
      });
    } else if (updateContext === "vehicle") {
      updateVehicle(vehicleForm.vehicleId, {
        vehicleId: vehicleForm.vehicleId,
        model: vehicleForm.model,
        location: vehicleForm.location,
        vehicleStatus: vehicleForm.vehicleStatus,
        maintenanceDate: vehicleForm.maintenanceDate,
        fuelLevel: vehicleForm.fuelLevel,
      });
    }
    setOpenUpdate(false);
    setReloadPage(true);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (props.data === "machinery") {
      addMachine(machineryForm);
      setOpenAdd(false);
      setReloadPage(true);
    }
    if (props.data === "technician") {
      addTechnician(technicianForm);
      setOpenAdd(false);
      setReloadPage(true);
    }
    if (props.data === "vendor") {
      addVendor(vendorForm);
      setOpenAdd(false);
      setReloadPage(true);
    }
    if (props.data === "vehicle") {
      addVehicle(vehicleForm);
      setOpenAdd(false);
      setReloadPage(true);
    }
    if (props.data === "serviceMaintenance") {
      addServiceMaintenance(serviceMaintenanceForm);
      setOpenAdd(false);
      setReloadPage(true);
    }
    // window.location.href = "/logistic-management/dashboard";
  };

  let data = [];

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
      console.log(data);
      break;
    default:
      data = machinery;
      break;
  }

  const deleteData = (id, data) => {
    if (data === "machinery") {
      deleteMachine(id);
      setReloadPage(true);
    }
    if (data === "technician") {
      deleteTechnician(id);
      setReloadPage(true);
    }
    if (data === "vendor") {
      deleteVendor(id);
      setReloadPage(true);
    }
    if (data === "vehicle") {
      deleteVehicle(id);
      setReloadPage(true);
    }
    if (data === "serviceMaintenance") {
      deleteServiceMaintenance(id);
      setReloadPage(true);
    }
    // window.location.href = "/logistic-management/dashboard";
  };

  const getHeading = (data) => {
    const keys = Object.keys(data || {});
    const heading = [];
    keys.forEach((key) => {
      heading.push(key);
    });
    // remove first element
    heading.shift();
    heading.push("action");
    // console.log(heading);
    return heading;
  };

  const tableData = {
    name: "",
    heading: [],
    body: [],
  };
  tableData.name = props.data.toUpperCase();
  tableData.heading = getHeading(data[0]);
  tableData.body = data.map((data, index) => {
    const keys = Object.keys(data);
    keys.shift();
    return (
      <tr key={index}>
        {keys.map((key, index) => {
          if (
            key === "machineStatus" ||
            key === "availability" ||
            key === "vehicleStatus"
          ) {
            return <td key={index}>{data[key] ? "Active" : "Inactive"}</td>;
          }
          if (key === "maintenance" || key === "vendorItems") {
            return (
              <td key={index}>
                {data[key].map((item, index) => {
                  return <p key={index}>{item}</p>;
                })}
              </td>
            );
          }
          return <td key={index}>{data[key]}</td>;
        })}
        <td>
          {/*<Button variant="contained">Edit</Button>*/}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.serviceId && (
              <Button
                variant="contained"
                onClick={() => handleOpenTechList(data.serviceId)}
              >
                Assign
              </Button>
            )}

            {!data.serviceId && (
              <Button
                variant="contained"
                color="success"
                onClick={() => handleOpenUpdate(data)}
              >
                Update
              </Button>
            )}

            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteData(
                  props.data === "machinery"
                    ? data.machineId
                    : props.data === "vehicle"
                      ? data.vehicleId
                      : props.data === "technician"
                        ? data.technicianId
                        : props.data === "vendor"
                          ? data.vendorId
                          : data.serviceId,
                  props.data
                );
              }}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [searchServiceId, setSearchServiceId] = React.useState('');
  const selectedService = useMemo(() => {
    if (!searchServiceId) return null;
    return serviceMaintenance.find((sM) => sM.serviceId == searchServiceId)
  }, [searchServiceId])

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">{/* <h1>View Stocks</h1> */}</div>
          <Button variant="contained" onClick={handleOpenAdd}>
            Add {props.data}
          </Button>

          {
            props.data == 'serviceMaintenance' &&
            <Button variant="contained" color="secondary" onClick={handleOpenGenerateServiceReports}>
              Generate Service Reports
            </Button>
          }

          <TableComp data={tableData} />
        </div>

        <Modal open={openGenerateServiceReports} onClose={() => setOpenGenerateServiceReports(false)}>
          <Box sx={style}>
            <form>
              <Input
                placeholder="Search By Service Id"
                value={searchServiceId}
                name="searchServiceId"
                onChange={(e) => {
                  setSearchServiceId(e.target.value);
                }}
              />
              <Button sx={{ mx: 4 }} variant="contained" type="button" onClick={() => {
                searchServiceId
              }}>
                Search
              </Button>
            </form>
            {selectedService && <>
              <Typography
                sx={{
                  marginTop: "30px",
                  marginBottom: "5px",
                  padding: "7px",
                  backgroundColor: "#d0f7e6",
                }}
              >
                Service Id : {selectedService.serviceId}
              </Typography>
              <Typography
                sx={{
                  marginBottom: "5px",
                  padding: "7px",
                  backgroundColor: "#d0f7e6",
                }}
              >
                Service Cost : {selectedService.serviceCost}
              </Typography>
              <Typography
                sx={{
                  marginBottom: "5px",
                  padding: "7px",
                  backgroundColor: "#d0f7e6",
                }}
              >
                Technician Id : {selectedService.technicianId}

              </Typography>
            </>}

          </Box>


        </Modal>
        <Modal open={openUpdate} onClose={handleCloseUpdate}>
          <form onSubmit={handleUpdateSubmit}>
            {props.data === "machinery" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Machinery
                </Typography>
                <Input
                  value={machineryForm.machineId}
                  placeholder="Machine Id"
                  name="machineId"
                  onChange={(e) =>
                    handleMachineryForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  value={machineryForm.machineName}
                  placeholder="Machine Name"
                  name="machineName"
                  onChange={(e) =>
                    handleMachineryForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  value={machineryForm.machineModel}
                  type="number"
                  placeholder="Machine Model"
                  name="machineModel"
                  onChange={(e) =>
                    handleMachineryForm(
                      e.target.name,
                      parseInt(e.target.value || 0)
                    )
                  }
                />
                <Input
                  value={machineryForm.currentJob}
                  placeholder="Current Job"
                  name="currentJob"
                  onChange={(e) =>
                    handleMachineryForm(e.target.name, e.target.value)
                  }
                />

                <FormControl variant={"standard"} sx={{ minWidth: "170px" }}>
                  <InputLabel>Machine Status</InputLabel>

                  <Select
                    label={"Machine Satatus"}
                    name="machineStatus"
                    placeholder={"Machine Status"}
                    onChange={(e) =>
                      handleMachineryForm(
                        e.target.name,
                        e.target.value == "Active"
                      )
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>

                <Input
                  placeholder="Maintenance"
                  value={machineryForm.maintenance}
                  name="maintenance"
                  onChange={(e) => {
                    let values = e.target.value
                      ?.split(",")
                      .map((v) => v.trim());
                    handleMachineryForm(e.target.name, values);
                  }}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "technician" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Technician
                </Typography>
                <Input
                  value={technicianForm.technicianId}
                  placeholder="Technician Id"
                  name="technicianId"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  value={technicianForm.name}
                  placeholder="Technician name"
                  name="name"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  value={technicianForm.specialty}
                  placeholder="Speciality"
                  name="specialty"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  value={technicianForm.yearsOfExperience}
                  type="number"
                  placeholder="Years of Experience"
                  name="yearsOfExperience"
                  onChange={(e) =>
                    handleTechnicianForm(
                      e.target.name,
                      parseInt(e.target.value || 0)
                    )
                  }
                />
                <Input
                  value={technicianForm.currentJob}
                  placeholder="Current Job"
                  name="currentJob"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <FormControl variant={"standard"} sx={{ minWidth: "170px" }}>
                  <InputLabel>Availability</InputLabel>

                  <Select
                    label={"Availability"}
                    name="availability"
                    placeholder={"Availability"}
                    onChange={(e) =>
                      handleTechnicianForm(
                        e.target.name,
                        e.target.value == "Active"
                      )
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "vendor" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Vendor
                </Typography>
                <Input
                  t
                  value={vendorForm.name}
                  placeholder="Vendor Id"
                  name="vendorId"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  value={vendorForm.name}
                  placeholder="Name"
                  name="name"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  value={vendorForm.contactNumber}
                  placeholder="Contact Number"
                  name="contactNumber"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  t
                  value={vendorForm.address}
                  placeholder="Address"
                  name="address"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  t
                  value={vendorForm.email}
                  placeholder="E-mail"
                  name="email"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  value={vendorForm.vendorItems}
                  placeholder="Vendor Items"
                  name="vendorItems"
                  onChange={(e) => {
                    let values = e.target.value
                      ?.split(",")
                      .map((v) => v.trim());
                    handleVendorForm(e.target.name, values);
                  }}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "vehicle" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Vehicle
                </Typography>
                <Input
                  t
                  value={vehicleForm.vehicleId}
                  placeholder="Vehicle Id"
                  name="vehicleId"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  value={vehicleForm.model}
                  placeholder="Model"
                  name="model"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  value={vehicleForm.location}
                  placeholder="Location"
                  name="location"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <FormControl variant={"standard"} sx={{ minWidth: "170px" }}>
                  <InputLabel>Vehicle Status</InputLabel>

                  <Select
                    label={"Vehicle Status"}
                    name="vehicleStatus"
                    placeholder={"Vehicle Status"}
                    onChange={(e) =>
                      handleVehicleForm(
                        e.target.name,
                        e.target.value == "Active"
                      )
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Input
                  t
                  value={vehicleForm.maintenanceDate}
                  placeholder="Maintenance Date"
                  name="maintenanceDate"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  value={vehicleForm.fuelLevel}
                  placeholder="Fuel Level"
                  name="fuelLevel"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "serviceMaintenance" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Service
                </Typography>
                <Input
                  t
                  placeholder="Service Id"
                  name="serviceId"
                  onChange={(e) =>
                    handleServiceMaintenanceForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Service Cost"
                  name="serviceCost"
                  onChange={(e) =>
                    handleServiceMaintenanceForm(
                      e.target.name,
                      parseInt(e.target.value || 0)
                    )
                  }
                />

                <Button variant="contained" type="submit">
                  Update
                </Button>
              </Box>
            ) : null}
          </form>
        </Modal>

        {/* tech list modal */}
        <Modal open={openTechList} onClose={handleCloseAdd}>
          <Box sx={style}>
            {techList.map((list, index) => {
              return (
                <Typography
                  key={index}
                  sx={{
                    marginBottom: "5px",
                    padding: "4px",
                    backgroundColor:
                      selectedTech === index ? "#d0f7e6" : "#dcddde",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => handleTechSelect(index, list.technicianId)}
                >
                  {list.technicianId}
                </Typography>
              );
            })}

            <Button
              variant="contained"
              type="submit"
              onClick={() => handleTechAdd(selectedServiceId, selectedTechId)}
            >
              OK
            </Button>
          </Box>
        </Modal>

        <Modal open={openAdd} onClose={handleCloseAdd}>
          <form onSubmit={handleOnSubmit}>
            {props.data === "machinery" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Machinery
                </Typography>
                <Input
                  t
                  placeholder="Machine Id"
                  name="machineId"
                  onChange={(e) =>
                    handleMachineryForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  placeholder="Machine Name"
                  name="machineName"
                  onChange={(e) =>
                    handleMachineryForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Machine Model"
                  name="machineModel"
                  onChange={(e) =>
                    handleMachineryForm(
                      e.target.name,
                      parseInt(e.target.value || 0)
                    )
                  }
                />
                <Input
                  placeholder="Current Job"
                  name="currentJob"
                  onChange={(e) =>
                    handleMachineryForm(e.target.name, e.target.value)
                  }
                />

                <FormControl variant={"standard"} sx={{ minWidth: "170px" }}>
                  <InputLabel>Machine Status</InputLabel>

                  <Select
                    label={"Machine Satatus"}
                    name="machineStatus"
                    placeholder={"Machine Status"}
                    onChange={(e) =>
                      handleMachineryForm(
                        e.target.name,
                        e.target.value == "Active"
                      )
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>

                <Input
                  placeholder="Maintenance"
                  name="maintenance"
                  onChange={(e) => {
                    let values = e.target.value
                      ?.split(",")
                      .map((v) => v.trim());
                    handleMachineryForm(e.target.name, values);
                  }}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "technician" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Technician
                </Typography>
                <Input
                  t
                  placeholder="Technician Id"
                  name="technicianId"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Technician name"
                  name="name"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Speciality"
                  name="specialty"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Years of Experience"
                  name="yearsOfExperience"
                  onChange={(e) =>
                    handleTechnicianForm(
                      e.target.name,
                      parseInt(e.target.value || 0)
                    )
                  }
                />
                <Input
                  placeholder="Current Job"
                  name="currentJob"
                  onChange={(e) =>
                    handleTechnicianForm(e.target.name, e.target.value)
                  }
                />
                <FormControl variant={"standard"} sx={{ minWidth: "170px" }}>
                  <InputLabel>Availability</InputLabel>

                  <Select
                    label={"Availability"}
                    name="availability"
                    placeholder={"Availability"}
                    onChange={(e) =>
                      handleTechnicianForm(
                        e.target.name,
                        e.target.value == "Active"
                      )
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "vendor" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Vendor
                </Typography>
                <Input
                  t
                  placeholder="Vendor Id"
                  name="vendorId"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Name"
                  name="name"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Contact Number"
                  name="contactNumber"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  t
                  placeholder="Address"
                  name="address"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  t
                  placeholder="E-mail"
                  name="email"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  placeholder="Vendor Items"
                  name="vendorItems"
                  onChange={(e) => {
                    let values = e.target.value
                      ?.split(",")
                      .map((v) => v.trim());
                    handleVendorForm(e.target.name, values);
                  }}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "update" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Vendor
                </Typography>
                <Input
                  t
                  placeholder="Vendor Id"
                  name="vendorId"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Name"
                  name="name"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Contact Number"
                  name="contactNumber"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  t
                  placeholder="Address"
                  name="address"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  t
                  placeholder="E-mail"
                  name="email"
                  onChange={(e) =>
                    handleVendorForm(e.target.name, e.target.value)
                  }
                />

                <Input
                  placeholder="Vendor Items"
                  name="vendorItems"
                  onChange={(e) => {
                    let values = e.target.value
                      ?.split(",")
                      .map((v) => v.trim());
                    handleVendorForm(e.target.name, values);
                  }}
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "vehicle" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Vehicle
                </Typography>
                <Input
                  t
                  placeholder="Vehicle Id"
                  name="vehicleId"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Model"
                  name="model"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Location"
                  name="location"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <FormControl variant={"standard"} sx={{ minWidth: "170px" }}>
                  <InputLabel>Vehicle Status</InputLabel>

                  <Select
                    label={"Vehicle Status"}
                    name="vehicleStatus"
                    placeholder={"Vehicle Status"}
                    onChange={(e) =>
                      handleVehicleForm(
                        e.target.name,
                        e.target.value == "Active"
                      )
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
                <Input
                  t
                  placeholder="Maintenance Date"
                  name="maintenanceDate"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  t
                  placeholder="Fuel Level"
                  name="fuelLevel"
                  onChange={(e) =>
                    handleVehicleForm(e.target.name, e.target.value)
                  }
                />
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : props.data === "serviceMaintenance" ? (
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Service
                </Typography>
                <Input
                  t
                  placeholder="Service Id"
                  name="serviceId"
                  onChange={(e) =>
                    handleServiceMaintenanceForm(e.target.name, e.target.value)
                  }
                />
                <Input
                  type="number"
                  placeholder="Service Cost"
                  name="serviceCost"
                  onChange={(e) =>
                    handleServiceMaintenanceForm(
                      e.target.name,
                      parseInt(e.target.value || 0)
                    )
                  }
                />

                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            ) : null}
          </form>
        </Modal>
      </main>
    </>
  );
}
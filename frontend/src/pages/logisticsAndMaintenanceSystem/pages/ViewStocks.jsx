import React, { useContext, useState } from "react";
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
  } = useContext(logisticsAndMaintenanceContext);

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
  };

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openTechList, setOpenTechList] = React.useState(false);

  const handleOpenTechList = (id) => {
    setOpenTechList(true);
    setSelectedServiceId(id);
  };
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setOpenTechList(false);
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (props.data === "machinery") {
      addMachine(machineryForm);
      setOpenAdd(false);
    }
    if (props.data === "technician") {
      addTechnician(technicianForm);
      setOpenAdd(false);
    }
    if (props.data === "vendor") {
      addVendor(vendorForm);
      setOpenAdd(false);
    }
    if (props.data === "vehicle") {
      addVehicle(vehicleForm);
      setOpenAdd(false);
    }
    if (props.data === "serviceMaintenance") {
      addServiceMaintenance(serviceMaintenanceForm);
      setOpenAdd(false);
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
    if (data === "serviceMaintenance") {
      deleteServiceMaintenance(id);
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

  return (
    <>
      <main>
        <div className="head-title">
          <div className="left">{/* <h1>View Stocks</h1> */}</div>
          <Button variant="contained" onClick={handleOpenAdd}>
            Add {props.data}
          </Button>
          <TableComp data={tableData} />
        </div>

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
      </main>
    </>
  );
}

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ResourcePath } from "../constant/ResourcePath.jsx";

export const logisticsAndMaintenanceContext = createContext(null);

const LogisticsAndMaintenanceProvider = (props) => {

    const [machinery, setMachinery] = useState([]);
    const [vehicle, setVehicle] = useState([]);
    const [technician, setTechnician] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [serviceMaintenance, setServiceMaintenance] = useState([]);

    const fetchMachinery = useCallback(() => {
        axios.get(ResourcePath.BASE_API + ResourcePath.MACHINE_API + ResourcePath.GET_ALL_MACHINE)
            .then(res => {
                setMachinery(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const deleteMachine = useCallback((id) => {
        axios.delete(ResourcePath.BASE_API + ResourcePath.MACHINE_API + ResourcePath.DELETE_MACHINE + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const addMachine = useCallback((data) => {
        axios.post(ResourcePath.BASE_API + ResourcePath.MACHINE_API + ResourcePath.ADD_MACHINE, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const fetchTechnician = useCallback(() => {
        axios.get(ResourcePath.BASE_API + ResourcePath.TECHNICIAN_API + ResourcePath.GET_ALL_TECHNICIAN)
            .then(res => {
                setTechnician(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const deleteTechnician = useCallback((id) => {
        axios.delete(ResourcePath.BASE_API + ResourcePath.TECHNICIAN_API + ResourcePath.DELETE_TECHNICIAN + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const addTechnician = useCallback((data) => {
        axios.post(ResourcePath.BASE_API + ResourcePath.TECHNICIAN_API + ResourcePath.ADD_TECHNICIAN, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const fetchVendor = useCallback(() => {
        axios.get(ResourcePath.BASE_API + ResourcePath.VENDOR_API + ResourcePath.GET_ALL_VENDOR)
            .then(res => {
                setVendor(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const deleteVendor = useCallback((id) => {
        axios.delete(ResourcePath.BASE_API + ResourcePath.VENDOR_API + ResourcePath.DELETE_VENDOR + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const addVendor = useCallback((data) => {
        axios.post(ResourcePath.BASE_API + ResourcePath.VENDOR_API + ResourcePath.ADD_VENDOR, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const fetchVehicle = useCallback(() => {
        axios.get(ResourcePath.BASE_API + ResourcePath.VEHICLE_API + ResourcePath.GET_ALL_VEHICLE)
            .then(res => {
                setVehicle(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const deleteVehicle = useCallback((id) => {
        axios.delete(ResourcePath.BASE_API + ResourcePath.VEHICLE_API + ResourcePath.DELETE_VEHICLE + id)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const addVehicle = useCallback((data) => {
        axios.post(ResourcePath.BASE_API + ResourcePath.VEHICLE_API + ResourcePath.ADD_VEHICLE, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        fetchMachinery();
    }, [fetchMachinery]);

    useEffect(() => {
        fetchTechnician();
    }, [fetchTechnician]);

    useEffect(() => {
        fetchVendor();
    }, [fetchVendor]);

    useEffect(() => {
        fetchVehicle();
    }, [fetchVehicle]);

    const contextValue = useMemo(() => {
        return {
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
        }
    }, [machinery, vehicle, technician, vendor, serviceMaintenance, deleteMachine, deleteTechnician, deleteVendor, addMachine, addTechnician, addVendor, deleteVehicle, addVehicle]);

    return (
        <logisticsAndMaintenanceContext.Provider value={contextValue}>
            {props.children}
        </logisticsAndMaintenanceContext.Provider>
    )
}

export default LogisticsAndMaintenanceProvider;

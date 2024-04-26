export const ResourcePath = {

    BASE_API: "http://localhost:8090/api",

    // MACHINE
    MACHINE_API: "/m1",
    GET_ALL_MACHINE: '/getMachines',
    GET_MACHINE_BY_ID: '/byId/',
    GET_MACHINE_BY_NAME: '/byName/',
    GET_MACHINE_STATUS_BY_ID: '/getMachineStatus/',
    GET_MACHINE_MAINTENANCE_BY_ID: '/getMachineMaintenanceHistory/',

    ADD_MACHINE: '/addMachine',
    UPDATE_MACHINE: '/updateMachine/',
    DELETE_MACHINE: '/deleteMachine/',


    //Technician
    TECHNICIAN_API: "/T1",
    GET_ALL_TECHNICIAN: '/getTechnicians',
    GET_TECHNICIAN_BY_ID: '/technicianById/',

    ADD_TECHNICIAN: '/addTechnician',
    UPDATE_TECHNICIAN: '/updateTechnician/',
    DELETE_TECHNICIAN: '/deleteTechnician/',

    TECHNICIAN_AVAILABILITY_BY_ID: '/checkAvailability/',

    //Vendor
    VENDOR_API: "/vendor",
    GET_ALL_VENDOR: '/getVendors',
    GET_VENDOR_BY_ID: '/vendorById/',

    ADD_VENDOR: '/addVendor',
    UPDATE_VENDOR: '/updateVendor/',
    DELETE_VENDOR: '/deleteVendor/',

    //Vehicle
    VEHICLE_API: "/v1",
    GET_ALL_VEHICLE: '/getVehicles',
    GET_VEHICLE_BY_ID: '/byId/getVehicle/',

    ADD_VEHICLE: '/addVehicle',
    UPDATE_VEHICLE: '/updateVehicle/',
    DELETE_VEHICLE: '/deleteVehicle/',




}
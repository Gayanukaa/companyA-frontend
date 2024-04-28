//import useNavigate from 'react-router-dom';
import * as reqSend from '../../../global/reqSender.jsx';

const getOrderId = () => {
    return new Promise((resolve, reject) => {
        reqSend.defaultReq("GET", "api/financeSalesTable/generateID", null,
            response => {
                if (response.status === 200 && response.data) {
                    const oid = response.data.toString();
                    resolve(oid);
                } else {
                    console.error("Invalid response format:", response);
                    reject(new Error("Invalid response format"));
                }
            },
            error => {
                console.error("API request failed:", error);
                reject(error);
            }
        );
    });
};

const saveRecord = (oid, items, totalPrice) => {
    return new Promise((resolve, reject) => {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today. getDate();
        const currentDate = year + "/" + month + "/" + date;
        const componentList = [];
        for (const key in items) {
            if (items[key] > 0) {
                componentList.push(key.toString());
            }

        }
        //add customer id
        const requestData = {
            "_id": {
                "$oid": "662213df80341b1e86443b32"
            },
            "orders": [
                {
                    "order_ID": oid,
                    "order_date": currentDate,
                    "order_amount": totalPrice,
                    "components": componentList
                }
            ]
        };
        console.log(requestData);//add customerid
        reqSend.defaultReq("POST", `api/SalesTable/662213df80341b1e86443b32/addRecord`, requestData,
            response => {
                if (response.status === 201 && response.data) {
                    console.log("Record saved successfully");
                    resolve();
                } else {
                    console.error("Invalid response format:", response);
                    reject(new Error("Invalid response format"));
                }
            },
            error => {
                console.error("API request failed:", error);
                reject(error);
            }
        );
    });
};

const saveFinanceRecord = (oid, items, totalPrice) => {
    return new Promise((resolve, reject) => {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today. getDate();
        const currentDate = year + "/" + month + "/" + date;
        const componentList = [];
        for (const key in items) {
            if (items[key] > 0) {
                componentList.push(key.toString());
            }
        }
        //addcustomer id
        const requestData = {
            "_id": {
                "$oid": "662213df80341b1e86443b32"
            },
            "orders": [
                {
                    "_id": oid,
                    "order_date": currentDate,
                    "order_amount": totalPrice,
                    "components": componentList
                }
            ]
        };
        console.log(requestData);
        reqSend.defaultReq("POST", "api/financeSalesTable/addRecord", requestData,
            response => {
                if (response.status === 201 && response.data) {
                    console.log("Record saved successfully");
                    resolve();
                } else {
                    console.error("Invalid response format:", response);
                    reject(new Error("Invalid response format"));
                }
            },
            error => {
                console.error("API request failed:", error);
                reject(error);
            }
        );
    });
};

const checkout = async (items, totalPrice) => {
   //const navigate = useNavigate();
    console.log("items",items);
    try {
        const oid = await getOrderId();
//uncomment to save records
//         await saveRecord(oid, items, totalPrice);
//         await saveFinanceRecord(oid, items, totalPrice);
        console.log(oid, typeof oid);
        console.log("Navigate to payBills");
        //navigate('/payBills');
    } catch (error) {
        console.error("Error occurred", error);

    }
};

export default checkout;

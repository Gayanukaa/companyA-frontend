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
       // const customer_Id = localStorage.getItem("userId");
        const customer_Id = "0002ec60dc82d25a7b918f75";
        console.log(customer_Id);
        const requestData = {
            "_id": {
                "$oid": customer_Id
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
        console.log(requestData);
        reqSend.defaultReq("POST", `api/SalesTable/${customer_Id}/addRecord`, requestData,
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
        //add customer id
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

const subtractProducts = (items) => {
    return new Promise((resolve, reject) => {
        const productList = [];
        for (const key in items) {
            if (items[key] > 0) {
                productList.push(key.toString());
            }

        }
        reqSend.defaultReq("POST", 'api/products/updateTable', productList,
            response => {
                if (response.status === 200 && response.data) {
                    console.log("product deleted successfully");
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

const subtractExistingProducts = (items) => {
    return new Promise((resolve, reject) => {
        const productList = [];
        for (const key in items) {
            if (items[key] > 0) {
                productList.push(key.toString());
            }

        }
        reqSend.defaultReq("POST", 'api/existingProducts/updateTable', productList,
            response => {
                if (response.status === 200 && response.data) {
                    console.log("product deleted successfully");
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
    try {
        const oid = await getOrderId();
        await saveRecord(oid, items, totalPrice);

        await saveFinanceRecord(oid, items, totalPrice);
        console.log("order saved");
        const productList = Object.entries(items)
            .filter(([key, value]) => value > 0)
            .map(([key, value]) => ({
                itemId: key,
                quantity: value
            }));
        console.log('product_list',productList);
        if (Object.keys(items).some(key => key.includes('I'))) {
            console.log('deleting products from product table');
            await subtractProducts(productList);
        }
        else if (Object.keys(items).some(key => key.includes('E'))) {
            console.log('deleting products from existing product table');
            await subtractExistingProducts(productList);
        }
        console.log("return to dashboard");
    } catch (error) {
        console.error("Error occurred", error);

    }
};

export default checkout;

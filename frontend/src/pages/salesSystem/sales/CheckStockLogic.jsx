import * as reqSend from '../../../global/reqSender.jsx';
import payBills from "../components/payBills.jsx";

const handleStockCheckResponse = (response, showUnavailable) => {
    if (response.status === 200 && response.data) {
        const unavailable = response.data.filter(item => !item.inStock);

        if (unavailable.length === 0) {
            // If all items are available, proceed to payBills
            payBills();
        } else {
            // If some items are unavailable, show them to the user
            showUnavailable(unavailable);
        }
    } else {
        console.error("Invalid response format:", response);
    }
};

const checkStock = (items, data, get_val, showUnavailable) => {
    const requestData = Object.entries(items).map(([itemId, itemCount]) => ({
        itemId: itemId,
        quantity: itemCount,
        unitPrice: getPriceByItemId(itemId, data)
    }));

    // Send request to check stock
    reqSend.defaultReq("POST", get_val, requestData,
        response => handleStockCheckResponse(response, showUnavailable),
        error => console.error("API request failed:", error)
    );
};

const getPriceByItemId = (itemId, data) => {
    const item = data.find(item => item.id === itemId);
    return item ? item.price : null;
};

export { checkStock, getPriceByItemId };

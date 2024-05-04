import * as reqSend from '../../../global/reqSender.jsx';



const checkStock = (items, data, get_val, showUnavailable,totalPrice,payBills) => {

    const requestData = Object.entries(items).map(([itemId, itemCount]) => ({
        itemId: itemId,
        quantity: itemCount,
        unitPrice: data.find(item => item.id === itemId).price
    }));

    // Send request to check stock
    reqSend.defaultReq("POST", get_val, requestData,
        response => {
            if (response.status === 200 && response.data) {
                const unavailable = response.data.filter(item => !item.inStock);
                if (unavailable.length === 0) {
                    // If all items are available, proceed to checkout
                    payBills(totalPrice.toFixed(2).toString());
                } else {
                    // If some items are unavailable, give the user the option of buying the available items or cancelling the purchase
                    showUnavailable(unavailable);
                }
            } else {
                console.error("Invalid response format:", response);
            }
        },
        error => console.error("API request failed:", error)
    );
};

export { checkStock };

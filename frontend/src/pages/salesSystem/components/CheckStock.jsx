import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as reqSend from '../../../global/reqSender.jsx';

function CheckStock({ items, data, count, get_val}) {
    const [unavailableItems, setUnavailableItems] = useState([]);
    const [showInfo, setShowInfo] = useState(false);
    useEffect(() => {
        // Reset showInfo when count is set to 0
        if (count === 0) {
            setShowInfo(false);
        }
    }, [count]);

    //check if ordered quantity is available
  const handleCheckStock=() => {
      const requestData = Object.entries(items).map(([itemId, itemCount]) => ({
          itemId: itemId,
          quantity: itemCount,
          unitPrice: getPriceByItemId(itemId)
      }));
      reqSend.defaultReq("POST", get_val, requestData, response =>
      {    if (response.status === 200 && response.data) {
          const unavailable = response.data.filter(item => !item.inStock);
                    setUnavailableItems(unavailable);
                    //forward to payBills api
                    if (unavailable.length === 0) {
                        console.log("request payBills")
                    }
                    else{
                        setShowInfo(true);
                    }
      } else {
          console.error("Invalid response format:", response);
      }
      },
          error => {
              console.error("API request failed:", error);
          }
      );

    };
  //lookup price by item id
    function getPriceByItemId(itemId) {
        const item = data.find(item => item.id === itemId);
        return item ? item.price : null;
    }
   //lookup name by item id
    function getNameByItemId(itemId){
        const item= data.find(item=> item.id ===itemId);
        return item? item.name: null;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2} mb={2}>
            <Button
                variant="contained"
                color="primary"
                className="m-8"
                onClick={handleCheckStock}
                disabled={count <= 0}
                sx={{ opacity: count <= 0 ? 0.5 : 1, pointerEvents: count <= 0 ? 'none' : 'auto' }}
            >
                Check Stock
            </Button>
            {showInfo && (
                <Box m={6}>
                    {unavailableItems.length > 0 ? (
                        <div>
                            <p>The following items are not in stock:</p>
                            <ul>
                                {unavailableItems.map(item => (
                                    <li key={item.itemId}>{getNameByItemId(item.itemId)}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>All items are in stock.</p>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default CheckStock;

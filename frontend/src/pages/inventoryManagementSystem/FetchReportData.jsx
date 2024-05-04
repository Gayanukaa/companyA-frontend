import React, { useEffect } from 'react'
import axios from 'axios'
import * as reqSend from '../../global/reqSender.jsx';

// function FetchReportData() {
//     useEffect(() => {
//         // axios.get('https://jsonplaceholder.typicode.com/users')
//         axios.get('http://localhost:8090/api/v1/InvReports/details')
//         // axios.get('/api/v1/InvReports/details')
//         .then(res => console.log(res))
//         .catch(err => console.log(err))
//     }, [])
//   return (
//     <div>FetchReportData</div>
//   )
// }

function FetchReportData() {
    useEffect(() => {
        reqSend.defaultReq("GET", 'api/v1/repair/getDamagedItems', {}, 
        // reqSend.defaultReq("GET", 'api/v1/invReports/details', {}, 
                response => {
                    if (response.status === 200 && response.data) {
                        console.log(response.data);
                    } else {
                        console.error("Invalid response format:", response);
                    }
                },
                error => {
                    console.error("API request failed:", error);
                }
            );

    }, [])
  return (
    <div>FetchReportData</div>
  )
}

// function FetchReportData() {
//     useEffect(() => {
        
//         reqSend.defaultReq("GET", 'api/v1/invReports/details', {}, 
//                 response => {
//                     if (response.status === 200 && response.data) {
//                         console.log(response.data);
//                     } else {
//                         console.error("Invalid response format:", response);
//                     }
//                 },
//                 error => {
//                     console.error("API request failed:", error);
//                 }
//             );

//     }, [])

//     return (
//         <>
//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1>View Stocks</h1>
//                     </div>

//                     <TableComp data={tableData} />

//                 </div>

//             </main>
//         </>
//     )
// }



export default FetchReportData
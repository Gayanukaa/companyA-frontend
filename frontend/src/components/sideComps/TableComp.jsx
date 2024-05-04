import React from "react";
import '../../styles/dashboard.css';
import '../../styles/style.css';



const TableComp = (props) => {
  return (
    <div className="table-data" >
            <div className="order boxShadow1 ">
                <div className="head">
                    <h3>{props.data.name}</h3>

                </div>
                <table>
                    <thead>
                        <tr style={{ color: 'black' }}>
                            {props.data.heading.map((val,index)=>{
                                return(
                                    <th key={index}>{val}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                      {props.data.body}
                    </tbody>
                </table>
            </div>
        </div>
  );
};

export default TableComp;

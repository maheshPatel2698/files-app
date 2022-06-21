import React from 'react'
import { Table } from "react-bootstrap"

const FileItem = () => {
    return (
        <div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th colSpan={5} >GEM Contract NO</th>
                        <th >Contact Number</th>
                        <th >AlterNative Number</th>
                        <th>Location</th>
                        <th>Tracking Number</th>
                        <th>Tracking Status</th>
                        <th>Bill</th>
                        <th>Bill No</th>
                        <th>Bill Amout</th>
                        <th>CRAC status</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={5} ></td>
                        <td >Contact Number</td>
                        <td >AlterNative Number</td>
                        <td>Location</td>
                        <td>Tracking Number</td>
                        <td>Tracking Status</td>
                        <td>Bill</td>
                        <td>Bill No</td>
                        <td>Bill Amout</td>
                        <td>CRAC status</td>
                        <td>Payment Status</td>
                    </tr>


                </tbody>
            </Table>
        </div>
    )
}

export default FileItem
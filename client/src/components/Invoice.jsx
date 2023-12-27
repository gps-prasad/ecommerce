import React, { useEffect, useState } from 'react'
import './Invoice.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Invoice() {
    const [order,setOrder] = useState([])
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    const param = useParams()
    const id = param.id
    const getOrders = async() => {
      const user = JSON.parse(localStorage.getItem('auth')).user
      const data = await axios.get(`${Base_URL}/api/v1/orders/getorder/${id}`,{user})
      setOrder(data.data.order)
    }
    useEffect(()=>{
      getOrders()
    })
  return (
<div className="invoice-box">
  <table>
    <tbody>
      <tr className="top">
        <td colSpan={2}>
          <table>
            <tbody>
              <tr>
                <td className="title">
                <h4 className="m-0 display-5 font-weight-semi-bold">
          <span className="text-primary font-weight-bold border px-3 mr-1">
            E
          </span>
          Commerce
        </h4>
                </td>
                <td>
                  Invoice #: {order._id}
                  <br />
                  Created Date: {order.createdAt?.split('T')[0]}
                  <br />
                  Due: {order.createdAt?.split('T')[0]}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr className="information">
        <td colSpan={2}>
          <table>
            <tbody>
                <tr><td><h5>Address</h5></td><td><h5>Customer Details</h5></td></tr>
              <tr>
                <td>
                  {order.address1}
                  <br />
                  {order.city}
                  <br/>
                  {order.state}, {order.zip}
                </td>
                <td>
                  {order.firstName+' '+order.lastName}
                  <br />
                  {order.email}
                  <br />
                  {order.mobile}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr className="heading">
        <td>Payment Method</td>
        <td>NEFT</td>
      </tr>
      <tr className="details">
        <td>NEFT</td>
        <td>${order.total}
        </td>
      </tr>
      <tr className="heading">
        <td>Item</td>
        <td>Unit Price</td>
      </tr>
      {order?.products?.map((item,index)=>{
        return ( <tr>
        <td>{item.cartProduct.name}</td>
        <td>${item.cartProduct.price*item.quantity}</td>
      </tr>)
      })}
      <tr className="total">
        <td />
        <td>Total: ${order.total}</td>
      </tr>
    </tbody>
  </table>
</div>

  )
}

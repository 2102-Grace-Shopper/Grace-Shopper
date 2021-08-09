//CART/ORDER REACT UNDER CONSTRUCTION 
import React, {useEffect, useState} from "react";
import { removeProductFromOrder, checkOut, getPendingOrdersByUser  } from "../api/index"
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
 } from "reactstrap"

import {Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const GetAllOrder = ({user}) => {
    const { orders, setOrders } = useState([])
    useEffect(() => {
      if(user)
       getPendingOrdersByUser(user.user.id)
       .then((orders) => {
         if(orders){
          setOrders(orders)
         }  
       })
       .catch(console.error)
    }, [orders])

    console.log(orders)

    if(!user) {
      return (
        <div>
          <h1 id="CartCard" style={{
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid black',
            height: '300px',
            width:'500px',
          }}> Please <Link to='/loginUser'>Login</Link> or <Link to="/registerUser">Register</Link> For Access To Cart!
          </h1>
        </div>
      )
    } else {
      return (
        <div className="Orders"
        style={{
          display:"flex",
          flexWrap:"wrap",
          justifyContent:"space-around",
          marginTop: '50px',
          marginBottom:'50px'
        }}
        > {orders.map((order, index) => {
          return (
            <div className="orderType" key={index}>
              <Card
              style={{
                width: "325px",
                height:"475px",
                margin:"20px",
                padding:"10px",
                borderRadius:"5%"
              }}
              >
                <CardBody>
                  <CardTitle tag='h1'>
                    Your Cart:
                  </CardTitle>
                  <br/>
                  <CardSubtitle tag='h6' className='mb-2 text-muted'>
                    Status: {order.status}
                  <br/>
                  <br/>
                  Date Placed: {order.datePlaced}
                  </CardSubtitle>
                  <Button onClick={ async () => await checkOut(user.user.id, order.id)}>Check Out</Button>
                  <Button onClick={async () => await removeProductFromOrder(user.user.id)}>Remove</Button>
                </CardBody>
              </Card>
              </div>
          )
        })}
        </div>
      )
    }
  }
export default GetAllOrder;
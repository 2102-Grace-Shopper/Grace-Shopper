//CART/ORDER REACT UNDER CONSTRUCTION 
import React, {useEffect} from "react";

import { getOrders, removeProductFromOrder, checkOut } from "../api/index"

import {useHistory} from 'react-router-dom'

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
 } from "reactstrap"

import "bootstrap/dist/css/bootstrap.min.css";

const GetAllOrder = (props) => {
    const { orders, setOrders } = props;
    console.log(props)
    const history = useHistory();
    useEffect(() => {
       getOrders()
       .then((orders) => {
           setOrders(orders)
       })
       .catch(console.error)
    }, [setOrders])

    console.log(orders)

    return (
        <div
        className="Orders"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            border: '3px solid black',
            marginTop: '50px',
            marginBottom: "50px"
          }}
        >
          <div>
          <Button onClick={() => {
                  history.push('/products')
                }}> Back to Products
                </Button>
          </div>
          {orders.map((orders, index) => {
            return (
              <div className="orderType" key={index}>
                <Card
                  style={{
                    width: "325px",
                    height: "475px",
                    margin: "20px",
                    padding: "10px",
                    borderRadius: "5%"
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h1">Your Cart:</CardTitle>
                    <br/>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      Status: {orders.status}
                      <br/>
                      <br/>
                      Date Placed: {orders.datePlaced}
                    </CardSubtitle>
                    <Button onClick={ async () => {checkOut(orders.id)
                    }}>Check Out</Button>
                  <Button onClick={async () => await removeProductFromOrder(orders.id)}>Remove</Button>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      );
}

export default GetAllOrder;
import React, {useEffect} from "react";
import { addOrders } from "../api/index"
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
    useEffect(() => {
       addOrders()
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
            marginTop: '50px',
            marginBottom: "50px"
          }}
        >
          {orders.map((order, index) => {
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
                      Status: {order.status}
                      <br/>
                      <br/>
                      Date Placed: {order.datePlaced}
                    </CardSubtitle>
                    <Button>Check Out</Button>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      );
}

export default GetAllOrder;
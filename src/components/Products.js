import React, {useEffect} from "react";

import {getProducts} from "../api/index"

import {
    Card,
    CardImg, 
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
} from "reactstrap"

import "bootstrap/dist/css/bootstrap.min.css";

const GetAllProducts = (props) => {
    const { products, setProducts } = props;
    useEffect(() => {
       getProducts()
       .then((products) => {
           setProducts(products)
       })
       .catch(console.error)
    }, [setProducts])

    console.log(products)

    return (
        <div
        className="Products"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: '50px',
            marginBottom: "50px"
          }}
        >
          {products.map((products, index) => {
            return (
              <div className="productType" key={index}>
                <Card
                  style={{
                    width: "325px",
                    height: "475px",
                    margin: "20px",
                    padding: "10px",
                    borderRadius: "5%"
                  }}
                >
                  <CardImg
                    top
                    width="100%"
                    src={products.imageURL}
                    alt="Card image cap"
                    style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignSelf: "center",
                        maxHeight: "250px",
                        maxWidth: "225px",
                    }}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{products.name}</CardTitle>
                    <br/>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      Price: {products.price}
                      <br/>
                      <br/>
                      inStock: ${products.inStock}
                    </CardSubtitle>
                    <CardText>
                      Description:
                      <br/>  
                      {products.description}
                    </CardText>
                    <Button>Add To Cart</Button>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      );
}

export default GetAllProducts;
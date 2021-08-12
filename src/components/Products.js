import React, {useEffect} from "react";

import {getProducts, addProductsToOrders} from "../api/index"

import {useHistory} from 'react-router-dom'

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
    const { products, setProducts} = props;
    console.log(props)
    const history = useHistory();
    useEffect(() => {
       getProducts()
       .then((products) => {
           setProducts(products)
       })
       .catch(console.error)
    }, [setProducts])

  //   const onAdd = (product)=> {
  //     const exist = products.find((x) => x.id === product.id)
  //     if(exist) {
  //         setProducts(products.map((x) => 
  //         x.id === product.id ? {...exist, qty: exist.qty + 1} : x
  //         )
  //         );
  //     } else {
  //         setProducts([...products, {...product, qty:1}])
  //     }
  //     console.log(onAdd, 'we are in carts')
  // } 
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
                       marginTop: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignSelf: "center",
                        maxHeight: "150px",
                        maxWidth: "150px",
                    }}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{products.name}</CardTitle>
                    <br/>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      Price: ${products.price}
                      <br/>
                      <br/>
                      inStock: {products.inStock}
                    </CardSubtitle>
                    <CardText>
                      Description:
                      <br/>  
                      {products.description}
                    </CardText>
                 <Button onClick={async () => { 
                      await addProductsToOrders(products); 
                      console.log('we up in this b')
                      history.push('/orders/')
                    }
                  }>
                    Add To Cart</Button>
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </div>
      );
}

export default GetAllProducts;
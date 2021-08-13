import React, { useState, useEffect } from "react";
import { getDogs } from "../api/index";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import DogModal from "./DogModal";
import "bootstrap/dist/css/bootstrap.min.css";




const GetAllDogs = (props) => {
    const { dogs, setDogs } = props;
    const [modal, setModal] = useState(false);
  
    useEffect(() => {
      getDogs()
        .then((dogs) => {
          setDogs(dogs);
        })
        .catch(console.error);
    }, [setDogs]);
  
    console.log(dogs)

    return (
      <div
      className="Dogs"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: '50px',
          marginBottom: "50px"
        }}
      >
        {dogs.map((dogs, index) => {
          return (
            <div className="dogType" key={index}>
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
                  src={dogs.imageURL}
                  alt="Card image cap"
                  style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                      maxHeight: "150px",
                      maxWidth: "275px",
                  }}
                />
                <CardBody>
                  <CardTitle tag="h5">{dogs.name}</CardTitle>
                  <br/>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Age: {dogs.age} Years Old
                    <br/>
                    <br/>
                    Breed {dogs.breed} 
                    <br/>
                    <br/>
                    Price: ${dogs.price}
                    <br/>
                    <br/>
                    Description:
                    <br/>  
                    {dogs.description}
                  </CardSubtitle>
                  <Button onClick={() => setModal(true)}>Request Dog Visit!</Button>
                  <DogModal modal={modal}>Modal Modal</DogModal>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    );
  };

export default GetAllDogs;
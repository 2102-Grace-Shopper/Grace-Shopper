import React from "react";
import { getAllDogs, getAllDogBreeds } from "../api/index";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const GetAllDogs = (props) => {
    const { dogs, setDogs } = props;
  
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
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                      maxHeight: "250px",
                      maxWidth: "225px",
  
                  }}
                />
                <CardBody>
                  <CardTitle tag="h5">{dogs.name}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Type: {dogs.age} / Price: ${dogs.price}
                  </CardSubtitle>
                  <CardText>
                    {dogs.description}
                  </CardText>
                  <Button>Request Dog Visit!</Button>
                </CardBody>
              </Card>
            </div>
          );
        })}
      </div>
    );
  };

export default GetAllDogs;
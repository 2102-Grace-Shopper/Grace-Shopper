import React, { useEffect } from 'react';
import { getDogsHome } from "../api/index";
import { UncontrolledCarousel } from 'reactstrap';


// const Home = (props) => {

//     const { dogs, setDogs } = props;
  
//     useEffect(() => {
//       getDogsHome()
//         .then((dogs) => {
//           setDogs(dogs);
//         })
//         .catch(console.error);
//     }, [setDogs]);
  
//     console.log(dogs)

//     const items = [
//         {
//           src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
//           altText: 'Slide 1',
//           caption: 'Slide 1',
//           header: 'Slide 1 Header',
//           key: '1'
//         },
//       ];

//     {dogs.map((dogs, index) => {
//         return (
//         <div>
//             <UncontrolledCarousel items={items} />
//         </div>
//         );
//     })}
// };

const Home = (props) => {

    const { dogs, setDogs } = props;
  
    useEffect(() => {
      getDogsHome()
        .then((dogs) => {
          setDogs(dogs);
        })
        .catch(console.error);
    }, [setDogs]);
  
    console.log(dogs)

    const items = [
        {
          src: 'https://i.postimg.cc/N0t8kKBP/8536-28743-5665.jpg',
          altText: 'Slide 1',
          caption: 'Shiba Inu Bread',
          header: 'Bella',
          key: '1'
        },
        {
            src: 'https://i.postimg.cc/fT96KTjJ/440f11bf-b9d4-44de-a5c3-3f0893b04fa2.jpg',
            altText: 'Slide 1',
            caption: 'Dog Breed',
            header: 'Dog Name',
            key: '2'
          },
                  {
          src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EThird%20Dog%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
          altText: 'Slide 1',
          caption: 'Dog Breed',
          header: 'Dog Name',
          key: '3'
        },
      ];


        return (
        <div>
            <UncontrolledCarousel items={items} />
        </div>
        )};

export default Home;
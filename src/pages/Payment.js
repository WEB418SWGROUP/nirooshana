import { React } from "react";
import { CardGroup, Card, Form, Row, Col, Button, CardImg, Table } from "react-bootstrap";
import Input from "../controls/Input";
import Packages from "../components/Package";
import { useParams } from "react-router-dom";
import GetCurrentDate from "../controls/GetDate";
import { useState } from "react";

const Payment= () => {

  console.log(GetCurrentDate('-'));
  const { id } = useParams();
//   const [input, setInput] = useState({
//     cardNo: "",
//     nameOfCard: "",
//     expireDate: "",
//     cvc: ""
// })

// const [errors, setErrors] = useState({});

// const validate = (fieldValues = input) => {
//     let temp = { ...errors }
//     if ('cardNo' in fieldValues)
//         if (fieldValues.cardNo.length < 16) {
//             temp.cardNo = "The card No should be 16 number"
//         } else if (fieldValues.cardNo.length > 16) {
//             temp.cardNo = "The card No should be 16 number"
//         }
//         else {
//             temp.cardNo = ""
//         }
//     if ('nameOfCard' in fieldValues)
//         temp.nameOfCard = fieldValues.nameOfCard ? "" : "This field is required."
//     if ('expireDate' in fieldValues)
//         temp.expireDate = fieldValues.expireDate ? "" : "This field is required."
//     if ('cvc' in fieldValues)


//         if (fieldValues.cvc.length < 3) {
//             temp.cvc = "The cvc no should have 3 numbers"
//         } else if (fieldValues.cvc.length > 3) {
//             temp.cvc = "The cvc no should have 3 numbers"
//         }
//         else {
//             temp.cvc = ""
//         }

//     setErrors({
//         ...temp
//     })
//     if (fieldValues == input)
//         return Object.values(temp).every(x => x == "")


// }

  const packagedetails = [
    {
        id: 1,
        name: 'Gold',
        price: 400,
        image: require('../GoldIcon.png'),
        color: '#e6ac00'
       
    },
    {
        id: 2,
        name: 'Platinum',
        price: 500,
        image: require('../PlatinumIcon.png'),
        color: '#6a6b6b'
    },
    {
        id: 3,
        name: 'Silver',
        price: 300,
        image: require('../SilverIcon.png'),
        color: '#b7babc'

    }
]
   
    return(
        <>
        <CardGroup style={{padding:"3% 15%"}}>
            <Card>
            <Card.Img src={packagedetails[id-1].image} style={{width:"100%",height:"90%",padding:'5%'}} />
            </Card>
            <Card>
                <Card.Body style={{padding:'10%'}} >
                <Form>
                <h1 style={{fontSize:"30px",fontFamily:"Trebuchet MS",textAlign:"center"}}><b>Payment</b></h1> 
  <Table >
    <tbody>
      <tr>
        <td>Package</td>
        <td className="text-end"  style={{color: packagedetails[id-1].color, fontFamily:"Brush Script MT"}}><h5>{packagedetails[id-1].name}</h5></td>
      </tr>
      <tr>
        <td>Price</td>
        <td className="text-end"  style={{color: packagedetails[id-1].color}}><h5>{packagedetails[id-1].price}</h5></td>
      </tr>
    </tbody>
  </Table>

  <Form.Group className="mb-3" controlId="name">
    <Form.Label>Name on Card</Form.Label>
    <Form.Control id="nameOfCard" placeholder="Name on Card"   />
    {/* {errors && <div class="alert alert-danger">{errors}</div>} */}
  </Form.Group>

  <Form.Group className="mb-3" controlId="cardno">
    <Form.Label>Card Number</Form.Label>
    <Form.Control id="cardNo" placeholder="1111222233334444" maxlength = "16"  />
    {/* {errors && <div class="alert alert-danger">{errors}</div>} */}
  </Form.Group>



  <Row className="mb-3">
    <Form.Group as={Col} controlId="exp">
      <Form.Label>Expiry Date</Form.Label>
      <Form.Control id="expireDate" type="month" placeholder="Enter expiry date" min={GetCurrentDate('-')} />
      {/* {errors && <div class="alert alert-danger">{errors}</div>} */}
      </Form.Group>

    <Form.Group as={Col} controlId="cvc">
      <Form.Label>CVC</Form.Label>
      <Form.Control  id="cvc" placeholder="cvc" maxlength = "3" minlength = "3"/>
      {/* {errors && <div class="alert alert-danger">{errors}</div>} */}
      </Form.Group>
  </Row>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
                </Card.Body>
            </Card>
        </CardGroup>
        </>
    )
}

export default Payment;
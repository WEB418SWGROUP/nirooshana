import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from '../controls/Input'

import AddOTPNumber from "./AddOTPNumber";
import Popup from '../controls/Popup'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom'
import { encryptPassword, decryptPassword } from "./decryptAndEncrypt"
import Navigation5 from "../navigations/Navigation5"
import Button from '@mui/material/Button';

const Login = () => {
    // const [userType, setUserType] = React.useState('');

    const navigate = useNavigate();


    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const [otpNumber, setOtpNumber] = useState(1);

    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");

    localStorage.setItem("userType", "");
    localStorage.setItem("userId", "");



    const handleClose = () => setShow(false);


    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."

        if ('email' in fieldValues)
            if (!fieldValues.email) {
                temp.email = "This field is required."
            } else if (!(/$^|.+@.+..+/).test(fieldValues.email)) {
                temp.email = "This email is not valuable."
            } else {
                temp.email = ""
            }


        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }

    // const handleChange = e => setUserType(e.target.value);

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }




    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {

            var values = {
                userId: 0,
                userName: "",
                email: input.email,
                address: "",
                contactNumber: "",
                postcode: "",
                password: input.password,
                userTypeId: ""
            }

            if (input.email == "admin@gmail.com" && input.password == "admin123") {

                localStorage.setItem("userType", "admin");
                localStorage.setItem("userId", "0");
                navigate('/dashboard')
                return
            }

            try {
                const headers = {
                    'Content-Type': 'application/json'
                };

                var a = await axios.post("http://localhost:9000/users/login1", values, { headers });


                if (a.data == '') {
                    alert("not valid username")
                } else
                    if (decryptPassword(a.data.password) !== input.password) {
                        alert("not valid password")
                    } else {
                        var c;
                        if (a.data.userTypeId == 1) {
                            c = await axios.get("http://localhost:9000/users/getServiceProviderByUser/" + a.data.userId, { headers });
                            console.log(c.data)
                            if (c.data.result === "not Accepted") {
                                alert("Admin not yet accepted you")
                                return
                            }
                            var b = await axios.post("http://localhost:9000/users/login2", values, { headers });

                            console.log(b.data)
                            setOtpNumber(b.data)
                            setUserType("serviceProvider")
                            setUserId(c.data.serviceProviderId)
                            setShow(true)

                        } else if (a.data.userTypeId == 2) {
                            c = await axios.get("http://localhost:9000/users/gerServiceConsumer/" + a.data.userId, { headers });
                            console.log(c.data)
                            var b = await axios.post("http://localhost:9000/users/login2", values, { headers });

                            setOtpNumber(b.data)
                            setUserType("serviceConsumer")
                            setUserId(c.data.serviceConsumerId)


                            setShow(true)
                        } else {
                            c = await axios.get("http://localhost:9000/users/getAgentByUser/" + a.data.userId, { headers });
                            if (c.data.result === "not Accepted") {
                                alert("Admin not yet accepted you")
                                return
                            }
                            var b = await axios.post("http://localhost:9000/users/login2", values, { headers });

                            setOtpNumber(b.data)
                            setUserType("agent")
                            setUserId(c.data.agentId)


                            setShow(true)

                        }

                    }

                // if (a.data != null) {
                // setOtpNumber(a.data)
                // setShow(true)
                // }



                // alert(a.data);
            } catch (ex) {
                console.log(ex)
            }
        }

    }


    return (
        <div
        >
            <Popup
                show={show}
                handleClose={handleClose}

                title="Add OtpNumber"
            >
                <AddOTPNumber

                    otpNumber={otpNumber}
                    userType={userType}
                    userId={userId}

                />
            </Popup>
            <Navigation5></Navigation5>




            <div style={{ marginTop: "48px", float: 'left', marginLeft: "550px" }}>
                <Card sx={{ height: 400, width: 400 }}>
                    <CardContent>
                        <h3 style={{ marginLeft: '20px' }}>Welcome To Service Hub</h3>

                        <form onSubmit={handleSubmit} autoComplete="off">



                            <Input
                                id="email"
                                value={input.email}
                                handleInputChange={handleInputChange}
                                placeholder="Enter Email......"
                                errors={errors.email}
                            />


                            <Input
                                id="password"
                                value={input.password}
                                handleInputChange={handleInputChange}
                                placeholder="Enter password......"
                                errors={errors.password}
                            />

                            <Button type="submit" variant="contained" color="primary" style={{ margin: '30px', width: '84%' }}>Login</Button>

                        </form>


                    </CardContent>
                </Card>
            </div>


        </div>
    );


}
export default Login;

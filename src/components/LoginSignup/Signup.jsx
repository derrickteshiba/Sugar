import React, {useRef, useState} from 'react'
import { Card , Button, Form, Alert} from 'react-bootstrap'
import { useUserContext } from '../auth/userContext'
import {Link} from "react-router-dom"


export default function Signup() {
    const refEmail = useRef()
    const refPass = useRef()
    const refConfPass = useRef()

    const {signup} = useUserContext()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState()


    function handleSubmit(e) {
        e.preventDefault()
        const email =refEmail.current.value
        const password =refPass.current.value
        const confpassword = refConfPass.current.value

        if(refPass.current.value !== refConfPass.current.value)
        {
            return setError("Passwords aren't the same")
        }

        try{
            //console.log("hi")
            setError('')
            setLoading(true)
           // console.log("hi")
           console.log(refEmail.current.value,refPass.current.value)
            signup(refEmail.current.value, refPass.current.value)
            
        }
        catch{
            setError("Couldn't make account")
        }
        setLoading(false)
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">
                    Sign Up
                </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit ={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder = "name@gmail.com" required ref={refEmail}></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder = "************" required ref={refPass}></Form.Control>
                    </Form.Group>
                    <Form.Group id="confirm-password">
                        <Form.Label>Password Confirmation:</Form.Label>
                        <Form.Control type="password" placeholder = "************" required ref={refConfPass}></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} type ="submit" className="w-100 text-center mt-2">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="text-center w-100 mt-2">
            Already have an account? <Link to="/login">Log In!</Link>  
        </div>
     </>
  )
}



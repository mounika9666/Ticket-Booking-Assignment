import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import UserRepository from '../utils/users'
import 'react-toastify/dist/ReactToastify.css'
import "./SuperAgent.css"

const Home = () => {
  const history = useNavigate()

  const [superAgentInfo, setSuperAgentInfo] = useState({
    name: '',
    email: '',
    password: '',
    maxSeats: '',
    profileUpdated: ''
  })

  const getdata = (event) => {
    const { value, name } = event.target

    setSuperAgentInfo(() => {
      return {
        ...superAgentInfo,
        [name]: value,
      }
    })
  }

  const addData = (event) => {
    event.preventDefault()

    const { name, email } = superAgentInfo

    if (name === '') {
      toast.error(' name field is requred!', {
        position: 'top-center',
      })
    } else if (email === '') {
      toast.error('email field is requred', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      toast.error('plz enter valid email address', {
        position: 'top-center',
      })
    } else {
      toast.success("Agent information successfully updated!!")
      superAgentInfo.profileUpdated = false
      UserRepository.storeUser({...superAgentInfo, maxSeats: parseInt(superAgentInfo.maxSeats)})
      setTimeout(() => {
        history("/agentLogin")
      }, 3000)
    }
  }

  return (
    <>
      <div className="container">
        <section className="section-container">
          <div className="left_data">
            <h2 className="heading">Sign Up</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  placeholder="Enter Agent Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter Agent email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="maxSeats">
                <Form.Control
                  type="text"
                  name="maxSeats"
                  onChange={getdata}
                  placeholder="Max seats"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="submitButton"
                onClick={addData}
                type="submit"
              >
                Add Agent
              </Button>
            </Form>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  )
}

export default Home
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import UserRepository from '../utils/users'
import 'react-toastify/dist/ReactToastify.css'
import "./AgentLogin.css"

const Login = () => {
  const history = useNavigate()

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const getdata = (event) => {
    const { value, name } = event.target
    setUserInfo(() => {
      return {
        ...userInfo,
        [name]: value,
      }
    })
  }



  const addData = (event) => {
    event.preventDefault()
    const { email, password } = userInfo
    if (email === '') {
      toast.error('email field is requred', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      toast.error('plz enter valid email addres', {
        position: 'top-center',
      })
    } else if (password === '') {
      toast.error('password field is requred', {
        position: 'top-center',
      })
    } else if (password.length < 5) {
      toast.error('password length greater five', {
        position: 'top-center',
      })
    } else {
      const user = UserRepository.getUser(email)
      if (user.profileUpdated === false) {
        user.password = password
        user.profileUpdated = true
        UserRepository.storeUser({...user, isLoggedIn: true})
        history('/AgentProfile')
      } else {
        const user = UserRepository.authenticateUser(email, password)
        if (user) {
          alert('invalid details')
        } else {
          console.log('user login succesfulyy')
          UserRepository.storeUser({...user, isLoggedIn: true})
          history('/bookingPage')
        }
      }
    }
  }

  return (
    <>
      <div className="container">
        <section className="section-container">
          <div className="left_data">
            <h2 className="heading">Login</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <div className='btn-container'>
                <Button
                  variant="primary"
                  className="submitButton"
                  onClick={addData}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  )
}

export default Login

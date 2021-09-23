import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

function FoodForm(props) {
  const [form, setForm] = useState({
    id: '',
    foodname: '',
    expirydate: '',
    person: '',
    phone: '',
  })

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const checkEmptyInput = (input) => {
    let inputStatus;
      switch (input) {
        case "foodname":
          inputStatus = form.foodname === ''
          break
        case "expirydate":
          inputStatus = form.expirydate === ''
          break
        default:
          inputStatus = form.foodname === '' || form.expirydate === ''
          break
      }
      return inputStatus
  }

  const submitFormAdd = async (e) => {
    const response = await fetch(`https://doduzz3kdg.execute-api.ap-southeast-1.amazonaws.com/dev/api/food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foodname: form.foodname,
        expirydate: form.expirydate,
        person: form.person,
        phone: form.phone,
      })
    })

    const data = await response.json()
    props.addFood(data)
  }


  const submitFormEdit = async (e) => {
    const response = await fetch(`https://doduzz3kdg.execute-api.ap-southeast-1.amazonaws.com/dev/api/food/${form.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: form.id,
        foodname: form.foodname,
        expirydate: form.expirydate,
        person: form.person,
        phone: form.phone,
      })
    })
    const data = await response.json()
    props.updateFood(data)
  }

  useEffect(() => {
    if (props.item) {
      const { id, foodname, expirydate, person, phone } = props.item
      setForm({ id, foodname, expirydate, person, phone })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label>Food Name</Label>
        <Input type="text" name="foodname" id="foodname" onChange={handleInputChange} value={form.foodname}
        valid={!checkEmptyInput('foodname')}
        invalid={checkEmptyInput('foodname')}/>
        <FormFeedback invalid>* Required Field</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Expiry Date</Label>
        <Input type="date" name="expirydate" id="expirydate" onChange={handleInputChange} value={form.expirydate}
         valid={!checkEmptyInput('expirydate')}
         invalid={checkEmptyInput('expirydate')} />
         <FormFeedback invalid>* Required Field</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Person</Label>
        <Input type="text" name="person" id="person" onChange={handleInputChange} value={form.person} />
      </FormGroup>
      <FormGroup>
        <Label>Phone</Label>
        <Input type="text" name="phone" id="phone" onChange={handleInputChange} value={form.phone}/>
      </FormGroup>
      <Button color="primary" disabled={checkEmptyInput()}>Submit</Button>
    </Form>
  )
}

export default FoodForm
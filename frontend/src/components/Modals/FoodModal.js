import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import FoodForm from '../Forms/FoodForm'

function FoodModal(props) {
  const { item, addFood, updateFood, buttonLabel } = props;
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = <Button className="close" onClick={toggle}>
    &times;
  </Button>

  const modifyFood = (label) => {
    switch (label) {
      case "Edit Food":
        return <Button
          size="sm"
          color="info"
          onClick={toggle}
          style={{ float: "left", marginRight: "5%" }}>{label}
        </Button>
      case "Add Food":
        return <Button
          color="success"
          onClick={toggle}
          style={{ float: "left", marginRight: "5%" }}>{label}
        </Button>
      default:
    }

  }

  return (
    <div>
      {modifyFood(buttonLabel)}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>{buttonLabel}</ModalHeader>
        <ModalBody>
          <FoodForm
            addFood={addFood}
            updateFood={updateFood}
            toggle={toggle}
            item={item} />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default FoodModal
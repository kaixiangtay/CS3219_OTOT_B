import React from 'react'
import { Table, Button } from 'reactstrap';
import FoodModal from '../Modals/FoodModal'

function FoodTable(props) {
  const deleteItem = async (id) => {
    let confirmDelete = window.confirm('Delete item?')
    if (confirmDelete) {
      props.deleteFood(id)
      return await fetch(`https://doduzz3kdg.execute-api.ap-southeast-1.amazonaws.com/dev/api/food/${id}`, {
        method: 'DELETE'
      })
    }
  }

  const getAllFood = props.foodList.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.foodname}</td>
        <td>{item.expirydate}</td>
        <td>{item.person}</td>
        <td>{item.phone}</td>
        <td>
          <div>
            <FoodModal buttonLabel="Edit Food" item={item} updateFood={props.updateFood} />
            <Button color="danger" size="sm" onClick={() => deleteItem(item.id)}>Delete</Button>
          </div>
        </td>
      </tr>
    )
  })

  const createFoodTable = 
      <Table bordered dark responsive hover striped>
      <thead>
        <tr>
          <th>Food Name</th>
          <th>Expiry Date</th>
          <th>Person</th>
          <th>Phone</th>
          <th>Modify Food</th>
        </tr>
      </thead>
      <tbody>
        {getAllFood}
      </tbody>
    </Table>



  const emptyFoodTable = <h2 align='center'> No data to be loaded!!!</h2>

                        
  return (
    props.foodList.length !== 0 ? createFoodTable : emptyFoodTable
  )
}

export default FoodTable
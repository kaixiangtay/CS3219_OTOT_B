import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import FoodModal from '../components/Modals/FoodModal'
import FoodTable from '../components/Tables/FoodTable'

function Home() {

    const [foodList, setFoodList] = useState([])
    const [connectionStatus, setConnectionStatus] = useState('')

    const getfoodList = async () => {
        var tempFoodList = []

        try {
            fetch('https://doduzz3kdg.execute-api.ap-southeast-1.amazonaws.com/dev/api/food', {
                method: 'GET'
            }).then( (response) =>  {
            setConnectionStatus(response.status)
            return response.json()
            })
                .then(foodList => {
                    for (var i = 0; i < foodList.data.length; i++) {
                        tempFoodList.push({
                            id: foodList.data[i]._id,
                            foodname: foodList.data[i].foodname,
                            expirydate: foodList.data[i].expirydate,
                            person: foodList.data[i].person,
                            phone: foodList.data[i].phone
                        })
                    }
                    setFoodList(tempFoodList)
                })
        } catch (error) {
            console.log(error)  
        }
    }


    const addFood = (item) => {
        setFoodList([...foodList, item])
    }

    const updateFood = (item) => {
        var tempFoodList = []
        tempFoodList = foodList.map(curr => curr.id === item.id ? item : curr)
        setFoodList(tempFoodList);
    }

    const deleteFood = (id) => {
        var tempFoodList = []
        tempFoodList = foodList.filter(item => item.id !== id)
        setFoodList(tempFoodList)
    }

    const tableView  =
        <div>
            <Row>
                <Col>
                    <FoodTable foodList={foodList} updateFood={updateFood} deleteFood={deleteFood} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <FoodModal buttonLabel="Add Food" addFood={addFood} />
                </Col>
            </Row>
        </div>
        
    const StatusView = 
        <div> 
            <h3 align="center">Database connection Error!</h3>
        </div>

    const dbConnectionError = (connectionStatus !== 200)
      
    useEffect(() => {
        getfoodList()
    }, [foodList]);
    

    return (
        <Container>
            <Row style={{ marginTop: "2%" }}>
                <Col>
                    <h2 align="center">CRUD Food Tracker</h2>
                </Col>
            </Row>
            {dbConnectionError ? StatusView : tableView}
        </Container>
    )
}

export default Home
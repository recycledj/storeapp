import React, { useState, useEffect } from 'react';
import { Container, Row, ListGroup, Card, Button, Col } from 'react-bootstrap';
import axios from 'axios';
function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const GetProducts = async () => {
            const { data } = await axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/products'
            });
            setProducts(data);
        }
        GetProducts();
    }, [])
    console.log(products);
    return (
        <Container>
            <Row>
                <Col md={12} style={{ marginTop: '2vw', marginBottom: '2vw'}}>
                    <h1 className="text-center">Productos disponibles</h1>
                </Col>
                <Col md={12}>
                <ListGroup as="ul" horizontal>
                {products.length > 0 ? (
                    products.map((item, i) => {
                    return(
                        <Card style={{ width: '15rem', marginLeft: '1vw', left: '-1vw'}}>
                            <Card.Img variant="bottom" src={`http://localhost:8000/images/${item.path}`} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <Card.Text>
                                    SKU: {item.SKU}
                                </Card.Text>
                                <Button variant="primary" onClick={(e) => {}}>Ver más</Button>
                            </Card.Body>
                        </Card>
                    )
                })):(
                    <h1>No hay productos</h1>
                )}
                </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}
export default Products;
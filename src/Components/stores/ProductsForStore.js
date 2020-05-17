import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
function ProductsForStore(props) {
    const [storeProduct, setStoreProduct] = useState([]);
    const [store, setStore] = useState({});
    const { id } = props.match.params;

    useEffect(()=>{
        const GetProducts = async () => {
            const { data } = await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/stores/${id}/products/`
            });
            setStoreProduct(data);
        }
        const GetStore = async () => {
            const { data } = await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/stores/${id}`
            });
            setStore(data);
        }
        GetStore();
        GetProducts();
    }, [id])
    const CountProducts = storeProduct.length;
    return (
        <Fragment>
            <Container className="col-md-12">
                <Row>
                    <Col md={12}><h1 className="text-center mt-4">Productos de {store.name}</h1></Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ListGroup as="ul">
                        <p>Cantidad de productos: {CountProducts}</p>
                        {storeProduct.length > 0 ? (
                        storeProduct.map((item, i) => {
                            return (
                                <ListGroup.Item as="li" key={item} className="col-md-4">
                                    <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`http://localhost:8000/images/${item.path}`} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Card.Text>
                                            SKU: {item.SKU}
                                        </Card.Text>
                                        <Button variant="primary">Ver más</Button>
                                    </Card.Body>
                                    </Card>
                                </ListGroup.Item>
                            )
                        })): ( <h1>No hay productos</h1>)}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default ProductsForStore;
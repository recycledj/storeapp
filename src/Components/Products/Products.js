import React, { useState, useEffect } from 'react';
import { Container, Row, ListGroup, Card, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
function Products() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        GetProducts();
    }, [])
    const GetProducts = async () => {
        const { data } = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/products'
        });
        setProducts(data);
    }
    const DeleteProduct = async (id) => {
        try {
            const { data } = await axios({
                method: 'delete',
                url: `http://127.0.0.1:8000/api/products/${id}`
            });
            if(data) {
                swal({
                    title: 'Eliminado!',
                    text: 'Se ha eliminado correctamente',
                    icon: 'success',
                    buttons: 'Ver productos'
                });
                setTimeout(()=> {
                    GetProducts();
                }, 200)
            }
        } catch (error) {
            swal({
                title: 'Error',
                text: 'Inténtalo de nuevo o más tarde',
                icon: 'error', 
                buttons: 'success'
            });
        }
    }
    const ViewProduct = async (item) => {
        setTimeout(()=>{
            window.location.href = `/products/${item}`;
        }, 300)
    }
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
                        <Card style={{ width: '40vw', marginLeft: '1vw', left: '-1vw'}} key={item.id}>
                            <Card.Img variant="bottom" src={`http://localhost:8000/images/${item.path}`} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <Card.Text>
                                    SKU: {item.SKU}
                                </Card.Text>
                                <Button variant="primary" onClick={(e) => { ViewProduct(item.id)}}>Ver</Button>
                                <Button variant="danger" onClick={(e) => DeleteProduct(item.id)} style={{marginLeft: '1vw'}}>Eliminar</Button>
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
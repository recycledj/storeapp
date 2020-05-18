import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

function ViewProduct(props) {
    const { id } = props.match.params;
    const [stores, setStores] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        value: '',
        path: '',
        SKU: '',
        store_id: ''
    });
    const pathImage = product.path;
    useEffect(()=> {
        const GetProduct = async () => {
            const { data } = await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/products/${id}`
            });
            setProduct(data);
        }
        const GetStores = async () => {
            const { data } = await axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/api/stores/'
            });
            setStores(data);
        }
        GetStores();
        GetProduct();
    },[id])
    const onChange = (e) => {
        const { name, value } = e.target;
        const updateProduct = { ...product };
        updateProduct[name] = value;
        setProduct(updateProduct);
    }
    const updateProduct = async () =>{
        const path = document.querySelector('#path');
        const fd = new FormData();
        fd.append('name', product.name);
        fd.append('description', product.description);
        fd.append('value', product.value);
        fd.append('SKU', product.SKU);
        fd.append('store_id', product.store_id);
        fd.append('path', path.files[0]);
        try {
            const { data } = await axios({
                method: 'post',
                url: `http://127.0.0.1:8000/api/products/update/${id}`,
                data: fd,
                headers: { 'content-type': 'multipart/form-data'}
            })
            if(data) {
                swal({
                    title: 'Actualizado',
                    text: 'Se ha actualizado con éxito el producto',
                    icon: 'success',
                    buttons: 'Volver a productos'
                });
                setTimeout(()=>{
                    window.location.href = '/products/'
                }, 300  )
            }
        } catch (error) {
            swal({
                title: 'Error',
                text: 'Inténtelo más tarde',
                icon: 'error'
            });
        }
    }
    return (
        <Container>
            <Row>
                <Col md={12} style={{marginTop: '2vw', marginBottom:'2vw'}}>
                    <h1 className="text-center">Producto: {product.name}</h1>
                </Col>
                <Col xs={6} md={12} style={{ marginBottom: '2vw'}}>
                    <Image src={`http://127.0.0.1:8000/images/${pathImage}`} thumbnail
                    style={{ width: '15%', position: 'relative', left: '40%', right: '40%'}}
                    />
                </Col>
                <Col md={12}>
                    <Form>
                        <Col md={12} className="d-flex flex-wrap">
                            <FormGroup className="col-md-6">
                                <FormLabel>Nombre: </FormLabel>
                                <FormControl type="text" name="name" defaultValue={product.name} onChange={onChange}/>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <FormLabel>Descripción: </FormLabel>
                                <FormControl type="text" name="description" defaultValue={product.description} onChange={onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={12} className="d-flex flex-wrap">
                            <FormGroup className="col-md-3">
                               <FormLabel>SKU:</FormLabel> 
                               <FormControl type="number" name="SKU" defaultValue={product.SKU} onChange={onChange}/>
                            </FormGroup>
                            <FormGroup className="col-md-3">
                                <FormLabel>Tienda: </FormLabel>
                                <FormControl as="select" value={product.store_id} name="store_id" onChange={onChange}>
                                    <option>Elegir una tienda</option>
                                    {stores.map((select)=> (
                                        <option value={select.id} key={select.id}>{select.name}</option>
                                    ))}
                                </FormControl>
                            </FormGroup>
                            <FormGroup className="col-md-3">
                                <FormLabel>Precio: </FormLabel>
                                <FormControl type="number" min="0" name="value" defaultValue={product.value} onChange={onChange}/>
                            </FormGroup>
                            <FormGroup className="col-md-3">
                                <FormLabel>Imagen: </FormLabel>
                                <FormControl type="file" id="path" style={{border: '1px solid #CED4DA', padding: '0.2vw 0.2vw 0.2vw 0.2vw', borderRadius: '5px'}} onChange={onChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={12}>
                            <FormGroup className="col-md-12">
                                <Button type="button" variant="success" style={{width: '15%', float: 'right'}}
                                onClick={updateProduct}
                                >Guardar cambios</Button>
                                <Button type="button" variant="danger" style={{float: 'right', marginRight: '1vw', width: '15%'}} onClick={(e) => {
                                    setTimeout(()=> {
                                        window.location.href = '/products/'
                                    }, 200)
                                }}>Cancelar</Button>
                            </FormGroup>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default ViewProduct;
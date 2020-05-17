import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, FormLabel, FormControl, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
function EditStore(props) {
    const [store, setStore] = useState({});
    const { id } = props.match.params;
    useEffect(()=> {
        const GetStore = async () => {
            const { data } = await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/api/stores/${id}`
            });
            if(!data) {
                swal({
                    title: 'Error',
                    text: 'Este elemento no existe',
                    error: 'error'
                })
            }else {
                setStore(data);
            }
        }
        GetStore();
    }, [id])
    
    const inputsChange = (e) => {
        const { name, value } = e.target;
        const updateStore = { ...store };
        updateStore[name] = value;
        setStore(updateStore);
    }
    const updateStore = async () => {
        const { data } = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/stores/update/${id}`,
            data: store
        });
        if(data) {
            swal({
                title: 'Actualizado!',
                text: `Se ha actualizado correctamente`,
                icon: 'success',
                buttons: false
            });
            setTimeout(()=>{
                window.location.href = '/';
            }, 800)
        }else {
            swal({
                title: 'Error',
                text: `No se ha podido completar`,
                icon: 'error',
                buttons: false
            });
        }
    }
    return (
        <Fragment>
            <Container>
                <Row className="mt-5 col-md-12">
                    <Col xs={12}>
                        <h1 className="text-center">Nueva tienda</h1>
                    </Col>
                    <Col xs={12}>
                        <Form className="justify-content-center text-center mt-4">
                            <FormGroup className="d-flex flex-wrap text-left">
                                <Col xs={6}>
                                    <FormLabel>Nombre: </FormLabel>
                                    <FormControl type="text" name="name" placeholder="Ingrese aquí el nombre" onChange={inputsChange} defaultValue={store.name}/>
                                </Col>
                                <Col xs={6}>
                                    <FormLabel>Fecha de apertura: </FormLabel>
                                    <FormControl type="date" name="oppening_date" onChange={inputsChange} defaultValue={store.oppening_date}/>
                                </Col>
                            </FormGroup>
                            <Button type="button" className="bg-success col-md-3 mt-4" onClick={updateStore}>GUARDAR</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default EditStore;
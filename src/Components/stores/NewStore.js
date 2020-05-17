import React, { Fragment, useState } from 'react';
import { Container, Row, Form, Col, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
function NewStore()
{
    const [store, setStore] = useState({});

    const inputsChange = (e) => {
        const { name, value } = e.target;
        const newStore = { ...store };
        newStore[name] = value;
        setStore(newStore);
    }
    const saveStore = async () => {
        const { data } = await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/stores/',
            data: store
        });
        if(data) {
            swal({
                title: 'Creado',
                text: 'Se ha creado éxitosamente',
                icon: 'success', 
                buttons: false
            });
            setTimeout(()=> {
                window.location.href = '/';
            }, 800)
        }else {
            swal({
                title: 'Error',
                text: 'Inténtelo de nuevo',
                icon: 'error'
            })
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
                        <Form className="justify-content-center text-center">
                            <FormGroup className="d-flex flex-wrap text-left">
                                <Col xs={6}>
                                    <FormLabel>Nombre: </FormLabel>
                                    <FormControl type="text" name="name" placeholder="Ingrese aquí el nombre" onChange={inputsChange}/>
                                </Col>
                                <Col xs={6}>
                                    <FormLabel>Fecha de apertura: </FormLabel>
                                    <FormControl type="date" name="oppening_date" onChange={inputsChange}/>
                                </Col>
                            </FormGroup>
                            <Button type="button" className="bg-success col-md-3 mt-4" onClick={saveStore}>GUARDAR</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}
export default NewStore;
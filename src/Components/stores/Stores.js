import React, { Fragment, useState, useEffect }from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import swal from 'sweetalert';
function Stores() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        GetStores();
    }, []);

    const GetStores = async () => {
        const { data } = await axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/stores/'
        });
        setStores(data);
    }
    const StoreEdit = (id) => {
        setTimeout(() => {
            window.location.href = `/editstore/${id}`;
        }, 200)
    }
    const DeleteStore = async (id) => {
        try {
            const { data } = await axios({
                method: 'delete',
                url: `http://127.0.0.1:8000/api/stores/${id}`
            });
            if(data) {
                swal({
                    title: 'Eliminado!',
                    text: 'Se ha eliminado el registro',
                    icon: 'success',
                    buttons: 'Cerrar'
                });
                setTimeout(()=> {
                    GetStores();
                }, 200)
            }
        } catch (error) {
            swal({
                title: 'Opps :(',
                text: 'No podemos eliminar esta tienda porque tiene productos vinculados',
                icons: 'Error'
            });
        }
    }
    const ProductsForStore = (id) => {
        setTimeout(()=>{
            window.location.href = `/stores/${id}/products/`;
        }, 200)
    }
    return (
        <Fragment>
            <Container className="col-md-12">
                <Row className="justify-content-center mt-5">
                    <Col xs={10}>
                        <Table bordered={1}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>NOMBRE DE TIENDA</th>
                                    <th>FECHA DE APERTURA</th>
                                    <th className="text-center">ACCIÓN</th>
                                    <th>PRODUCTOS</th>
                                </tr>
                            </thead>
                            {
                            stores.length > 0 ? (
                            stores.map((item, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr className='border-1'>
                                            <td>{i}</td>
                                            <td>{item.name}</td>
                                            <td>{new Date(item.oppening_date).toDateString()}</td>
                                            <td className="d-flex flex-row text-center">
                                                <Col md={6}>
                                                    <Button type="button" className="btn btn-success col-md-12" onClick={(e) => StoreEdit(item.id)}>Editar</Button>
                                                </Col>
                                                <Col md={6}>
                                                    <Button type="button" className="btn btn-danger col-md-12" onClick={(e) => DeleteStore(item.id)}>Eliminar</Button>
                                                </Col>
                                            </td>
                                            <td>
                                                <Button type="button" className="btn btn-warning col-md-12" onClick={(e) => ProductsForStore(item.id)}>
                                                    VER PRODUCTOS
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })) : (
                                <Container>
                                    <Row>
                                        <h2>Aún no existen tiendas.</h2>
                                    </Row>
                                </Container>
                            )}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
} 
export default Stores;
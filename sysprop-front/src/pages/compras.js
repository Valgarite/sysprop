import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

async function fetchUsers(searchTerm = '') {
  try {
    const response = await fetch(`https://sysprop-production.up.railway.app/usuarios/`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', cedula: '', correo: '', username: '' , fechaNacimiento: "2000-01-01", cargo: 1, password: "adsdf"});
  const [formErrors, setFormErrors] = useState({ nombre: '', cedula: '', correo: '', username: '' });
  const [editUserId, setEditUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleModal = () => {
    setModal(!modal);
    setFormData({nombre: '', cedula: '', correo: '', username: '' , fechaNacimiento: "2000-01-01", cargo: 1, password: "adsdf"});
    setFormErrors({ nombre: '', cedula: '', correo: '', username: '' });
    setEditUserId(null);
    
  }

  const getUsers = async () => {
    const res = await fetch('https://sysprop-production.up.railway.app/usuarios/');
    const data = await res.json();
    setUsers(data);
  }
  

  useEffect(() => {
    fetchUsers().then(data => {
      setUsers(data);
    });
  }, []);
  

  const handleInputChange = e => {
    const { nombre, value } = e.target;
    setFormData({ ...formData, [nombre]: value });
    setFormErrors({ ...formErrors, [nombre]: '' });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const { nombre, cedula, correo, username, password, fechaNacimiento, cargo} = formData;

    // Validación de formulario
    //let errors = {};
    //if (!nombre) {
    //  errors.nombre = 'Por favor ingrese un nombre';
    //}
    //if (!cedula) {
    //  errors.cedula = 'Por favor ingrese un nombre de usuario';
    //}
    //if (!correo) {
    //  errors.correo = 'Por favor ingrese un correo electrónico';
    //}
    //if (!username) {
    //   errors.username = 'Por favor ingrese un número de teléfono';
    // }
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    if (editUserId) {
      // Actualizar usuario existente
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, cedula, correo, username })
      });
      const updatedUser = await res.json();
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    } else {
      // Agregar nuevo usuario
      const res = await fetch('https://sysprop-production.up.railway.app/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, cedula, correo, username, fechaNacimiento, cargo, password})
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }

    toggleModal();
  }

  const handleEdit = user => {
    setFormData(user);
    setEditUserId(user.id);
    setModal(true);
  }

  const handleDelete = async userId => {
    if (window.confirm('¿Está seguro de que desea eliminar este usuario?')) {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userId));
    }
  }
  function handleSearch(event) {
    const term = event.target.value;
    setSearchTerm(term);
    fetchUsers(term).then(data => {
      setUsers(data);
    });
  }
  

  return (
    <div className="container">
      <div className="col-md-6 text-md-right">
      <h2>Lista de Usuarios</h2>
      <div className="col-md-6">
          
        </div>
        </div>
        <div className="col-6">
          <input
            type="text"
            placeholder="Buscar Usuario"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
       
    <Button color="primary" className="col-2" onClick={toggleModal}>Agregar usuario</Button>
    <Modal isOpen={modal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Agregar usuario</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nombre">Nombre</Label>
            <Input type="text" nombre="nombre" id="nombre" onChange={handleInputChange} />
            {/* {formErrors.nombre && <div className="text-danger">{formErrors.nombre}</div>} */}
          </FormGroup>
          <FormGroup>
            <Label for="cedula">Nombre de usuario</Label>
            <Input type="text" nombre="cedula" id="cedula" onChange={handleInputChange} />
            {/* {formErrors.cedula && <div className="text-danger">{formErrors.cedula}</div>} */}
          </FormGroup>
          <FormGroup>
            <Label for="correo">Correo electrónico</Label>
            <Input type="email" nombre="correo" id="correo" onChange={handleInputChange} />
            {/* {formErrors.correo && <div className="text-danger">{formErrors.correo}</div>} */}
          </FormGroup>
          <FormGroup>
            <Label for="username">Teléfono</Label>
            <Input type="text" nombre="username" id="username" onChange={handleInputChange} />
            {/* {formErrors.username && <div className="text-danger">{formErrors.username}</div>} */}
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Guardar</Button>{' '}
        <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
      </ModalFooter>
    </Modal>
    <Table className="mt-3">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Nombre de usuario</th>
          <th>Correo electrónico</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.cedula}</td>
            <td>{user.cedula}</td>
            <td>{user.correo}</td>
            <td>{user.username}</td>
            <td>
              <Button color="warning" size="sm" className="mr-2" onClick={() => handleEdit(user)}>Editar</Button>
              <Button color="danger" size="sm" onClick={() => handleDelete(user.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);
}
export default App;
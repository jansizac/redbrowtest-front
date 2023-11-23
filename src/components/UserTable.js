// src/components/UserTable.js
import React, { useState, useEffect } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import Swal from "sweetalert2";

const UserTable = ({ setIsAuthenticated }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [elementosPorPagina, setElementosPorPagina] = useState(10);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  const fetchUsuarios = async (pagina, limit) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${apiUrl}/api/Usuarios?page=${pagina}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (response.status === 401) {
      cerrarSesion();
      return;
    }

    const data = await response.json();
    setUsuarios(data.registros);
    setTotalPaginas(data.meta.totalPages);
  };

  const eliminarUsuario = async (idUsuario) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");
    const response = await fetch(
      `${apiUrl}/api/Usuarios/${idUsuario}`,
      {
        method: "DELETE",
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) {
      cerrarSesion();
      return;
    }

    fetchUsuarios(paginaActual, elementosPorPagina);
  };

  const confirmarEliminacion = (idUsuario) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarUsuario(idUsuario);
        Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
      }
    });
  };

  const addUser = async (userData) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${apiUrl}/api/Usuarios`, {
        method: "POST",
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }), // Asumiendo que la contraseña es necesaria
      });

      if (response.status === 401) {
        cerrarSesion();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          errorMessage: errorData.ErrorMessages.join(", "),
        };
      }

      fetchUsuarios(paginaActual, elementosPorPagina);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        errorMessage:
          "Error al agregar usuario, verifica que hayas llenado todos los campos.",
      };
    }
  };

  const editarUsuario = async (idUsuario, userData) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${apiUrl}/api/Usuarios/${idUsuario}`,
        {
          method: "PUT",
          headers: {
            Accept: "text/plain",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUsuario,
            nombre: userData.nombre,
            email: userData.email,
            password: userData.password, 
            edad: userData.edad,
          }),
        }
      );

      if (response.status === 401) {
        cerrarSesion();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          errorMessage: errorData.ErrorMessages.join(", "),
        };
      }

      fetchUsuarios(paginaActual, elementosPorPagina); // Actualizar lista de usuarios
      return { success: true };
    } catch (error) {
      return { success: false, errorMessage: "Error al editar usuario." };
    }
  };

  useEffect(() => {
    fetchUsuarios(paginaActual, elementosPorPagina);
  }, [paginaActual, elementosPorPagina]);

  const handlePageChange = (newPage) => {
    setPaginaActual(newPage);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Actualizar el estado para reflejar que el usuario ya no está autenticado
    setIsAuthenticated(false);
  };

  // Aquí podrías agregar las funciones de editar y eliminar

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => setShowAddUserModal(true)}
      >
        Agregar usuario
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.edad}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => {
                    setUsuarioAEditar(usuario);
                    setShowEditUserModal(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmarEliminacion(usuario.idUsuario)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="my-3">
        <label htmlFor="elementosPorPagina">Elementos por página:</label>
        <select
          id="elementosPorPagina"
          className="form-select"
          value={elementosPorPagina}
          onChange={(e) => setElementosPorPagina(Number(e.target.value))}
        >
          {[1, 5, 10, 20, 50, 100].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <nav>
        <ul className="pagination">
          {[...Array(totalPaginas).keys()].map((num) => (
            <li
              key={num}
              className={`page-item ${
                num + 1 === paginaActual ? "active" : ""
              }`}
            >
              <button
                onClick={() => handlePageChange(num + 1)}
                className="page-link"
              >
                {num + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <AddUserModal
        show={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSave={addUser}
      />
      <EditUserModal
        show={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
        onSave={editarUsuario}
        usuario={usuarioAEditar}
      />
    </div>
  );
};

export default UserTable;

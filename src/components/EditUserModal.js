import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const EditUserModal = ({ show, onClose, onSave, usuario }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setEdad(usuario.edad);
      setPassword(usuario.password);
    }
  }, [usuario]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onSave(usuario.idUsuario, { nombre, email, edad, password });
    if (result.success) {
      onClose();
      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
    } else {
      Swal.fire("Error", result.errorMessage, "error");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Usuario</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Edad</label>
                <input
                  type="number"
                  className="form-control"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;

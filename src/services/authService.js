import Swal from "sweetalert2";

const loginUser = async (username, password, onAuthSuccess) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  try {
    // Reemplaza esta URL con la URL de tu API
    const response = await fetch(`${apiUrl}/api/Authentication/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if(response.status === 401) {
      // mostramos el mensaje con swal
      Swal.fire("Aviso", "Usuario o contraseña incorrectos.", "error");
      return;
    }

    if (!response.ok) {
      throw new Error("Error en el login");
    }

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    onAuthSuccess(true);

  } catch (error) {
    console.error("Error en el login:", error);
    Swal.fire("Aviso", "Tu sesión expiró, vuelve a iniciar sesion.", "error");

    onAuthSuccess(false);
  }
};

export default loginUser;

import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {

    if (!prompt) {
      alert("Por favor ingrese una pregunta");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/preguntar`, { pregunta: prompt });
      setRespuesta(response.data.respuesta);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-lg">
        <h1 className="text-3xl text-center font-semibold text-blue-600 mb-4">COSITEC</h1>

        <div className="mb-4">
          <label htmlFor="prompt" className="text-gray-700">Ingrese su pregunta:</label>
          <textarea
            id="prompt"
            className="w-full h-24 border rounded-md mt-2 p-2 resize-none overflow-auto"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escriba su pregunta aquí"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Obtener Respuesta
        </button>


        <div className="mt-6 p-4 bg-gray-100 border rounded-md">
          <h2 className="font-semibold text-gray-700">Respuesta:</h2>
          <p className="text-gray-600">{
            loading ? "Cargando respuesta..." : respuesta || "Esperando pregunta..."
          }</p>
        </div>
      </div>
    </div>
  );
}

export default App;

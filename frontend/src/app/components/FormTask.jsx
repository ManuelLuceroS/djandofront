"use client"; // Esto marca el componente como un componente del cliente

import { useState } from "react";
import { useRouter } from 'next/navigation';

function FormTask() {
    const [reference, setReference] = useState('');
    const [trademark, setTrademark] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [supplier, setSupplier] = useState('');
    const [taskData, setTaskData] = useState(null); // Estado para almacenar los datos recibidos
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('reference', reference);
        formData.append('trademark', trademark);
        formData.append('model', model);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('supplier', supplier);

        try {
            const res = await fetch('http://127.0.0.1:8000/api/', {
                method: "POST",
                body: formData
            });
            if (!res.ok) {
                const errorData = await res.json();
                console.error('Error creating task:', errorData);
                throw new Error('Error creating task');
            }
            const data = await res.json();
            console.log(data);
            setTaskData(data); // Almacena los datos recibidos en el estado
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-slate-200 p-7 h-fit">
            <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold">CREAR MOTO</h1>
                <label htmlFor="reference" className="text-xs text-black">Referencia:</label>
                <input
                    type="text"
                    name="reference"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setReference(e.target.value)}
                />

                <label htmlFor="trademark" className="text-xs text-black">Marca Comercial:</label>
                <input
                    type="text"
                    name="trademark"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setTrademark(e.target.value)}
                />

                <label htmlFor="model" className="text-xs text-black">Modelo:</label>
                <input
                    type="text"
                    name="model"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setModel(e.target.value)}
                />

                <label htmlFor="price" className="text-xs text-black">Precio:</label>
                <input
                    type="text"
                    name="price"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setPrice(e.target.value)}
                />

                <label htmlFor="image" className="text-xs text-black">Imagen:</label>
                <input
                    type="file"
                    name="image"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setImage(e.target.value)}
                />

                <label htmlFor="supplier" className="text-xs text-black">Proveedor:</label>
                <input
                    type="text"
                    name="supplier"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setSupplier(e.target.value)}
                />
                <button className="bg-indigo-500 text-white rounded-md p-2 block w-full">Guardar</button>
            </form>

            {taskData && (
                <div className="mt-4 p-4 bg-white rounded-md shadow-md">
                    <h2 className="text-black font-bold">Moto Creada</h2>
                    <p><strong>Referencia:</strong> {taskData.reference}</p>
                    <p><strong>Marca Comercial:</strong> {taskData.trademark}</p>
                    <p><strong>Modelo:</strong> {taskData.model}</p>
                    <p><strong>Precio:</strong> {taskData.price}</p>
                    <p><strong>Proveedor:</strong> {taskData.supplier}</p>
                    {taskData.image && <img src={taskData.image} alt="Moto" className="mt-2 w-64 h-64 object-cover" />}
                </div>
            )}
        </div>
    );
}

export default FormTask;

import React, {useState} from "react";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Shopcar = () => {
    
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [identification, setIdentification] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log(name, address, city, identification)
        e.preventDefault();
        navigate('/purchase');
    }

    return (
        <div className='row'>
            <div className='col md-4'>
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Nombre"
                            autoFocus
                        />

                        <input 
                            type="text"
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                            className="form-control"
                            placeholder="Dirección"
                        />
                        
                        <input 
                            type="text"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            className="form-control"
                            placeholder="Ciudad"
                        />
                        
                        <input 
                            type="text"
                            onChange={e => setIdentification(e.target.value)}
                            value={identification}
                            className="form-control"
                            placeholder="No. de Identificación"
                        />
                    </div>

                    <button className="btn btn-primary btn-block">
                        Comprar
                    </button>
                </form>
            </div>
            <div className="col md-8">

            </div>
        </div>
    )
}
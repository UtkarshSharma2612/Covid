import React,{useState, useEffect} from 'react'
import { Modal, Fade } from '@mui/material';
import './admin.css'
import axios from 'axios';


const Admin = () => {


    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [dataDB, setData] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();
        

    const response = axios.post("http://localhost:1337/api/addCenter", {
          name,
          address
        });
        const data = response.data;
        console.log(data);

        setOpen(false)
        
    }


    useEffect(() => {
        getData({})
    },[]); 

    const getData= async ()=>{

        const response = axios.get('http://localhost:1337/api/list')
        .then((res) => {
            const data = res.data;
            console.log(data)
            setData(data);
          }).catch((error) => {
                console.warn(error);
            })


    }


    const deleteCenter = (id) => {
        console.log(id)
        const response = axios.post('http://localhost:1337/api/delete',{
            id,
        })
        const data = response.data;
        console.log(data);

    }


    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

   

    return (
      <div className="admin">

        <h1 style={{margin: '50px'}}>Admin Panel</h1>

        <button onClick={handleOpen} style={{float: 'right', marginLeft: '20px'}} >Add+</button>

        <Modal
        open={open}
        onClose={handleClose}
        >
        <Fade in={open}>
            <div className="modal-form">
                <div className='form-name'>
                    <label>Name</label>
                    <input value={name} type="text" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-address'>
                    <label>Address</label>
                    <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button onClick={handleSubmit} >Add</button>
            </div>
        </Fade>
      </Modal>
    

        
            <h1 style={{marginBottom: '20px' }}>Below are a list of vaccination centers</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
        
                {dataDB.map((e,i) => (
                    
                        <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.address}</td>
                            <button onClick={()=> {deleteCenter(e._id)}}>Delete</button>
                        </tr>
                    
                ))}

            </table>
        
      </div>
    )
}

export default Admin;
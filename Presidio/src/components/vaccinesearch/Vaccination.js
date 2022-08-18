import React,{useState, useEffect} from 'react';
import './Vaccination.css'

const Vaccination = () => {
    const API="";

    const [vaccine, setVaccine] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('');

    useEffect(() => {
        getVaccines();
    },[query]);

    const getVaccines = async () => {
        const response = await fetch(API);
        const data = await response.json();
        setVaccine(data);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
    };

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    };


    return (
        <div className="vaccination">
            <h1>Vaccination Center</h1>
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch} />
                <button className="search-btn" type="submit">Search</button>
            </form>

            <div>
                <ol>
                    <li>Urapakkam</li>
                    <li>Nungambakkam</li>
                </ol>
            </div>

            <div className='center'>
                <h1>Center Details</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Slots Available</th>
                    </tr>
                    <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td><button>Apply</button></td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Vaccination;
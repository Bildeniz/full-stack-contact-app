import { useState, useEffect } from 'react'

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';

import ContactList from "./Components/ContactList.jsx";
import CreateContact from "./Components/NewContact.jsx";

const backend_host = "http://localhost:5000"

function App() {
    const [contacts, setContacts] = useState([]);
    const [update, setUpdate] = useState(null);

    useEffect(()=>{
        axios
            .get(`${backend_host}/contacts`)
            .then((res)=>{
                setContacts(res.data);
            })
    }, [])

    const createContact = (e)=>{
        e.preventDefault();

        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const email = e.target.email.value;

        axios
            .post(
                `${backend_host}/create-contact`,
                {first_name, last_name, email}
                )
            .then((res)=>{
                setContacts([...contacts, res.data]);

                e.target.first_name.value = "";
                e.target.last_name.value = "";
                e.target.email.value = "";

                alert("Succesfully created!")
            })
            .catch((res)=>{
                alert(`${res.data}:${res.status}`);
            })
    }

    const updateContact = (new_contact)=>{
        setUpdate(null);

        axios
            .patch(`${backend_host}/update-contact/${new_contact.id}`, new_contact)
            .then((res)=>{
                const will_set_contact = contacts.slice()

                will_set_contact.forEach((value, index, array)=>{
                    if(value.id === new_contact.id){
                        array[index] = new_contact;
                    }
                });

                setContacts(will_set_contact);
            })
            .catch((res)=>{
                alert(`${res.data}:${res.status}`);
            })
    }

    const deleteB = (id) => {
        axios
            .delete(`${backend_host}/delete-contact/${id}`)
            .then(()=>{
                const newContacts = contacts.slice();

                newContacts.forEach((value, index, array)=>{
                    if(value.id === id){
                        array.splice(index, 1);
                    }
                });

                setContacts(newContacts);
            })
            .catch((res)=>{
                alert(`${res.data}:${res.status}`);
            });
    }

    return (
        <div className="container-sm">
            <h1>Contacts</h1>
            <ContactList contacts={contacts} update={update} setUpdate={setUpdate} updateContact={updateContact} deleteB={deleteB} />
            <CreateContact createContact={createContact}/>
        </div>
    )
}

export default App

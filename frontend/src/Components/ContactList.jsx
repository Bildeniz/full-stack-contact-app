import React from "react";

const Contact = ({contact, update, setUpdate, updateOnClick, updateContact, deleteB})=>{
    const submit = (e)=>{
        e.preventDefault();

        const first_name = e.target.first_name.value;
        const last_name = e.target.last_name.value;
        const email = e.target.email.value;

        updateContact({
            first_name, last_name, email, "id": contact.id
        })
    }

    const cancel = ()=>{
        setUpdate(null);
    }

    let render
    if(update === contact.id){
        render = (
            <form className="row justify-content-md-center align-items-center" onSubmit={submit}>
                <div className="col">{contact.id}</div>
                <div className="col"><input type="text" name="first_name" defaultValue={contact.first_name} required/></div>
                <div className="col"><input type="text" name="last_name" defaultValue={contact.last_name} required/></div>
                <div className="col"><input type="email" name="email" defaultValue={contact.email} required/></div>
                <div className="col">
                    <button className="btn btn-primary m-2" type="submit">Save</button>
                    <button className="btn btn-danger m-2" onClick={cancel}>Cancel</button>
                </div>
            </form>
        )
    }else {
        render = (
            <div className="row justify-content-md-center align-items-center">
                <div className="col">{contact.id}</div>
                <div className="col">{contact.first_name}</div>
                <div className="col">{contact.last_name}</div>
                <div className="col">{contact.email}</div>
                <div className="col">
                    <button className="btn btn-primary m-2" onClick={(e) => (updateOnClick(contact.id, e))}>Update
                    </button>
                    <button className="btn btn-danger m-2" onClick={()=>(deleteB(contact.id))}>Delete</button>
                </div>
            </div>
        )
    }

    return render;
}
const ContactList = ({contacts, update, setUpdate, updateContact, deleteB})=>{
    const updateOnClick = (id, e)=>{
        setUpdate(id)
    }


    return(
        <div className="card mb-4">
            <div className="card-header row mb-3">
                <div className="col"><strong>ID</strong></div>
                <div className="col"><strong>First Name</strong></div>
                <div className="col"><strong>Last Name</strong></div>
                <div className="col"><strong>Email Address</strong></div>
                <div className="col"><strong>Actions</strong></div>
            </div>
            <div className="card-body">
                {
                    contacts.map((contact)=>(<Contact key={contact.id} contact={contact} update={update} setUpdate={setUpdate} updateOnClick={updateOnClick} updateContact={updateContact} deleteB={deleteB}/>))
                }
            </div>
        </div>
    )
}

export default ContactList;
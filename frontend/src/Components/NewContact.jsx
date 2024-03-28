import React from "react";

const CreateContact = ({ createContact })=>{

    return (
        <div className="card">
            <div className="card-header">
                <h2>Create new contact</h2>
            </div>
            <div className="card-body">
                <form onSubmit={createContact}>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" name="first_name" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" name="last_name" className="form-control" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" name="email" className="form-control" required/>
                    </div>
                    <button className="btn btn-success btn-lg float-end">Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateContact;
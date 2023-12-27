import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Edit({editItem}) {
    const [value,setValue] = useState(editItem?.name);
    const Base_URL = process.env.REACT_APP_URL || 'http://localhost:3001';
    useEffect(()=>{
        setValue(editItem?.name)
    },[editItem])
    const handleEdit = async(id) => {
        try{
            const response = await axios.put(`${Base_URL}/api/v1/category/update-category/${id}`,{name:value},{
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('auth')).token,
                  },
              });
              
        }
        catch(error){
            console.log(error)
        }
    }
  return (
<div
  className="modal fade"
  id="exampleModalCenter"
  tabIndex={-1}
  role="dialog"
  aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">
          Edit Category
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body"><input
            type="text"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            className="form-control"
            placeholder="Edit Category..."
          /></div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>handleEdit(editItem?._id)}>
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

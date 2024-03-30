import React from 'react'
import config from "../../config.json";

const { SERVER_API } = config;
import { useState, useEffect } from "react";

export default function EditToDo(state) {
    const { getWork } = state;
    const handelEdit = (id) => {
        const newName = window.prompt("Nhập nội dung cần chỉnh sửa", state.data.name)
        if (newName ==="" || !newName.trim() ) {
            alert("Chỉnh sửa không thành công")
        }
        else if (newName === state.data.name) {
            alert("Giá trị nhập không thay đổi, không có gì để chỉnh sửa");
        }else{
            editWork(id, newName)
            alert("Chỉnh sửa thành công");
        }
        
    };
    const editWork = async (id, newName) => {            
        const response = await fetch(`${SERVER_API}/works/${id}`, {
            method: "PATCH",
            body: JSON.stringify({name: newName})
          });
        
        if (response.ok) {
          getWork();
        }
      };

  return (
       <button className='btn btn'
        onClick={(e) => {
        e.stopPropagation();
        handelEdit(state.data.id);
        }
        } >
        <i className="fa-regular fa-pen-to-square"></i></button>
  )
}

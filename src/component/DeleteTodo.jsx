import React from "react";
import config from "../../config.json";
const { SERVER_API } = config;

export default function DeleteTodo(props) {
  const { getWork } = props;
  const handelDelete = (id) => {
    if (window.confirm("Bạn chắc chắn xóa")) {
      deleteWork(id);
      alert("Xóa thành công");
    }
  };
  const deleteWork = async (id) => {
    const response = await fetch(`${SERVER_API}/works/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getWork();
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handelDelete(props.data.id);
      }}
      type="submit"
      className="btn btn-danger"
    >
      Delete
    </button>
  );
}

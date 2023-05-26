import React, { useState } from 'react';

const Task = ({ index, tasks, onUpdate, onDelete }) => {
    const { Task_id, Content, Due_date, Status, User_name } = tasks;
    const dueDate = new Date(Due_date);
    const dateFormatted = dueDate.toLocaleDateString('en-GB');

    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(Content);
    const [updatedDueDate, setUpdatedDueDate] = useState(dateFormatted);
    const [updatedStatus, setUpdatedStatus] = useState(Status);
    const [updatedUserName, setUpdatedUserName] = useState(User_name);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedContent(Content);
        setUpdatedDueDate(dateFormatted);
        setUpdatedStatus(Status);
        setUpdatedUserName(User_name);
    };

    const handleUpdate = () => {

        // Chuyển đổi sang đối tượng Date
        const formattedDate = new Date(updatedDueDate);

        // Lấy các thành phần ngày, tháng, năm
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1; 
        const year = formattedDate.getFullYear();

        // Tạo định dạng năm/tháng/ngày
        const formattedDateString = `${year}/${month}/${day}`;

        const updatedTask = {
            Content: updatedContent,
            Due_date: formattedDateString,
            Status: updatedStatus,
            User_name: updatedUserName,
        };
        onUpdate(updatedTask);
        setIsEditing(false);
    };

    return (
        <tr key={Task_id}>
            <td>{index + 1}</td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                ) : (
                    Content
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="date"
                        value={updatedDueDate}
                        onChange={(e) => setUpdatedDueDate(e.target.value)}
                    />
                ) : (
                    dateFormatted
                )}
            </td>
            <td>
                {isEditing ? (
                    <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Fulfil">Fulfil</option>
                        <option value="Reject">Reject</option>
                    </select>
                ) : (
                    Status
                )}
            </td>
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        value={updatedUserName}
                        onChange={(e) => setUpdatedUserName(e.target.value)}
                    />
                ) : (
                    User_name
                )}
            </td>
            <td>
                {isEditing ? (
                    <div style={{display:"flex"}}>
                        <button
                            style={{ margin: "0px 5px" }}
                            type="button"
                            className="btn btn-success"
                            onClick={handleUpdate}
                        >
                            Save
                        </button>
                        <button
                            style={{ margin: "0px 5px" }}
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        style={{ margin: "0px 5px" }}
                        type="button"
                        className="btn btn-success"
                        onClick={handleEdit}
                    >
                        Update
                    </button>
                )}
            </td>
            <td>
                <button
                    style={{ margin: "0px 5px" }}
                    type="button"
                    className="btn btn-danger"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default Task
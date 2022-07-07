import React, { useState } from "react";
import { Input, Button } from 'antd'
import { STATUS } from '../../config/status'


const ToDoItem = (props) => {
    const { onSubmit } = props
    const [ todoItem, setToDoItem] = useState({
        id: Math.random(),
        content: '',
        status: STATUS.IS_CREATE
    })
    const handleChange = (event) => {
        setToDoItem({
            ...todoItem,
            content: event.target.value
        })
    }
    const handleSubmit = () => {
        if (todoItem.content) {
            onSubmit && onSubmit(todoItem)
            setToDoItem({id: Math.random(), content: '', status: STATUS.IS_CREATE})
        }
    }
    return (
        <div className="todo-item-input">
            <Input value={todoItem.content} placeholder="请输入清单项" onPressEnter={handleSubmit} onChange={handleChange}></Input>
            <Button size="large" type="primary" onClick={handleSubmit}>提交</Button>
        </div>
    )
}

export default ToDoItem
import React, { useState } from "react";
import {List} from 'antd'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { STATUS } from "../../config/status";

const ToDoContainer = (props) => {
    const { todos = [], filterStatus, onOperate } = props
    const handleOperate = (operate, item) => {
        switch (operate) {
            case 'is-done':
                onOperate && onOperate({
                    ...item,
                    status: STATUS.IS_DONE
                })
                break;
            case 'is-delete':
                onOperate && onOperate({
                    ...item,
                    status: STATUS.IS_DELETE
                })
                break;
            default:
                break
        }
    }
    const showTodos = todos.filter(todo => filterStatus.includes(todo.status))
    return (
        <div className="todo-container">
            <List dataSource={showTodos} renderItem={
                (todo, index) => (
                    <List.Item className="todo-container-list">
                        <div>{todo.content}</div>
                        <div className="todo-item-operate">
                            <CloseCircleTwoTone onClick={() => handleOperate('is-delete',todo)}></CloseCircleTwoTone>
                            <CheckCircleTwoTone onClick={() => handleOperate('is-done',todo)}></CheckCircleTwoTone>
                        </div>
                    </List.Item>
                )
            }></List>
        </div>
    )
}

export default ToDoContainer
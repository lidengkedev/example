import React from "react";
import {Radio} from 'antd'
import { STATUS } from "../../config/status";

const TodoFilter = (props) => {
    const { filterStatus, onFilterStatus } = props
    const handleFilterChange = (event) => {
        onFilterStatus && onFilterStatus(event.target.value)
    }
    return (
        <div className="todo-filter">
            <Radio.Group value={filterStatus} onChange={handleFilterChange}>
                <Radio.Button value={`${STATUS.IS_CREATE}, ${STATUS.IS_DONE}`}>全部</Radio.Button>
                <Radio.Button value={`${STATUS.IS_CREATE}`}>未完成</Radio.Button>
                <Radio.Button value={`${STATUS.IS_DONE}`}>已完成</Radio.Button>
            </Radio.Group>
        </div>
    )
}

export default TodoFilter
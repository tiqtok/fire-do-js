import React, { FunctionComponent } from 'react';

interface TaskProps {
    key: number,
    title: string
}

export const Task: FunctionComponent<TaskProps> = (props) => {
    const {title} = props;

    console.log(title)
    return (
        <div>{title}</div>
    )
}

export default Task;
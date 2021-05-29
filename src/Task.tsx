import React, { FunctionComponent } from 'react';
import './Task.css';

interface TaskProps {
    key: number,
    title: string,
    width: number,
}

export const Task: FunctionComponent<TaskProps> = (props) => {
    const {title, width, key} = props;

    const scaleWidth = width / 100;
    const scaleWidthText = (() => {
        
        if (scaleWidth === 1) {
            return 'priority';
        } else if (scaleWidth < .3){
            return 'lowest-priority'
        } else {
            return 'normal-priority'
        }
    })()

    const roundWidth = width.toPrecision(3);

    console.log(typeof scaleWidth, "dispW")
    return (
        <div className="task" id={`task-id-${key}`}>
            <div className="title">
                <h3>{title + ": " + roundWidth + "% priority"}</h3>
                {/* <div className="delete-task" onClick={(e) => handleDelete(e)}>Delete</div> */}
            </div>
            <div className={`${
                scaleWidthText
            } priorities`} style={{
                'transform': `scaleX(${scaleWidth})`
            }}></div>
        </div>
    )
}

export default Task;
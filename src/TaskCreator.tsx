import { TargetElement } from '@testing-library/user-event';
import React, { MouseEvent} from 'react';
import FormInput from './FormInput';
import './TaskCreator.css';

// interface HandleChangeArgs {
//     [propName: string]: string | number;
// }

interface TaskCreatorProps {
    // (value: string | number): void;
}

// interface TaskCreatorState {
//     title: string;
//     nominalPriority: string;
//     durationInHours: number;
// }

class TaskCreator extends React.Component<any, any> {
    constructor(props: TaskCreatorProps){
        super(props)

        this.state = {
            title: "",
            nominalPriority: "",
            durationInHours: ""
        }
    }

    handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {

        const {handleCreateTask} = this.props;

        event.preventDefault();

        // const {title, nominalPriority, timeToComplete} = this.state;

        handleCreateTask(this.state);

        try {
            // Pass data up to Task Manager


            //clear the form
            this.setState({
                title: '',
                nominalPriority: '',
                durationInHours: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let parsedInt: number;

        if (name === "nominalPriority" || name === "durationInHours") {
            parsedInt = +value;
            this.setState({[name]: parsedInt});
        } else {
            this.setState({[name]: value});
        }

        // console.log(this.state);
    }

    render () {
        const {title, nominalPriority, durationInHours} = this.state;

        return (
            <form onSubmit={this.handleSubmit} >
                <div className="task-creator-form">
                    <FormInput 
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        label="Task Description"
                        required
                    />
                    <FormInput 
                        type="number"
                        min="1"
                        max="10"
                        name="nominalPriority"
                        value={nominalPriority}
                        onChange={this.handleChange}
                        label="Nominal Priority"
                        required
                    />
                    <FormInput 
                        type="string"
                        name="durationInHours"
                        value={durationInHours}
                        onChange={this.handleChange}
                        label="Time to complete"
                        required
                    />
                </div>
                <div id="submit-btn-container">
                    <button type="submit" id="submit-button"> Create Task </button>
                </div>
                
            </form>
        )
    }
}

export default TaskCreator;
import { title } from 'process';
import React from 'react';
import Task from './Task';

interface TaskListState {
    totalTime: number;
    tasks: any;
}

class TaskList extends React.Component<{}, TaskListState> {

    constructor(props: TaskListState){
        super(props)

        this.state = {
            totalTime: 16, 
            tasks: [{
                id: 0,
                title: "Do homework",
                nominalPriority: 10,
                durationInHours: 1,
                proportionalTime: 0,
                inverseProportionalTime: 0,
                realPriority: 0
            },{
                id: 1,
                title: "Clean room",
                nominalPriority: 5,
                durationInHours: 1,
                proportionalTime: 0,
                inverseProportionalTime: 0,
                realPriority: 0
            },{
                id: 2,
                title: "Wash car",
                nominalPriority: 1,
                durationInHours: 1,
                proportionalTime: 0,
                inverseProportionalTime: 0,
                realPriority: 0
            }]
        }
    }

    updatePriorityOfTasks = () => {
        const updatedTasks = [...this.state.tasks];

        updatedTasks.forEach((task) => {
            task.proportionalTime = task.durationInHours / this.state.totalTime;
            task.inverseProportionalTime = 1 - task.proportionalTime;
            task.realPriority = task.nominalPriority * Math.pow(task.inverseProportionalTime, 2);
        })

        this.setState({tasks: updatedTasks })

        console.log(this.state);
    }

    calculateRealPriority = () => {

    }

    render () {
        return (<div onClick={this.updatePriorityOfTasks}>
            { 
                this.state.tasks.map((task: any): any => {
                   return <Task key={task.id} title={task.title} />
                }) 
                
            }
            </div>
        )
    }

    // render() {
    //     return (<div>
    //     {this.state.tasks.map((person, index) => (
    //         <p>Hello, {person.name} from {person.country}!</p>
    //     ))}
    //     </div>);
    // }

}

export default TaskList; 
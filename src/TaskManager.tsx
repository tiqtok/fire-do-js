import { title } from 'process';
import React from 'react';
import Task from './Task';
import TaskCreator from './TaskCreator';
import './TaskManager.css';

interface TaskManagerState {
    idCount: number;
    totalTime: number;
    tasks: any;
}

class TaskManager extends React.Component<{}, TaskManagerState> {

    constructor(props: TaskManagerState){
        super(props)

        this.state = {
            idCount: 0,
            totalTime: 0, 
            tasks: []
        }
    }

    updatePriorityOfTasks = () => {
        const updatedTasks = [...this.state.tasks];

        let largestPriority = 0;

        updatedTasks.forEach((task) => {
            task.proportionalTime = task.durationInHours / this.state.totalTime;
            task.inverseProportionalTime = 1 - task.proportionalTime;
            //since the first task has 100% proportional time, 1 - 1 = 0 real priority.   
            const handleFirstTask = task.nominalPriority * Math.pow(task.inverseProportionalTime, 2);
            task.realPriority = handleFirstTask === 0 ? 1 : handleFirstTask;
            if (task.realPriority > largestPriority) largestPriority = task.realPriority; 
        });

        updatedTasks.forEach(task => {
            task.displayedPriority = (task.realPriority / largestPriority) * 100;
        })

        updatedTasks.sort((a, b) => a.realPriority - b.realPriority).reverse();

        this.setState({tasks: updatedTasks })

        console.log(this.state);
    }

    handleCreateTask = (newTask: any) => {
        newTask.id = this.state.idCount + 1;
        newTask.proportionalTime = 0;
        newTask.inverseProportionalTime = 0;
        newTask.realPriority = 0;
        newTask.displayedPriority = 0;

        this.setState({
            idCount: this.state.idCount + 1,
            totalTime: this.state.totalTime + newTask.durationInHours,
            tasks: [...this.state.tasks, newTask]
        }, this.updatePriorityOfTasks);
    }

    handleDeleteTask = (id: string) => {
        const newTasks = [...this.state.tasks];
        const index = newTasks.map((task)=> task.id).indexOf(id);
        const durationOfTask = newTasks[index].durationInHours;
        
        if (index !== -1){
            newTasks.splice(index, 1);
            this.setState({
                tasks: newTasks,
                totalTime: this.state.totalTime - durationOfTask,
            })
        }
    }

    render () {
        return (
            <>
                <TaskCreator handleCreateTask={this.handleCreateTask} />
                <div className="task-manager">
                    {
                        this.state.tasks.map((task: any): any => {
                        return <Task key={task.id} title={task.title} width={task.displayedPriority} deleteTask={this.handleDeleteTask} />
                        })
                    }
                </div>
            </>
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

export default TaskManager; 
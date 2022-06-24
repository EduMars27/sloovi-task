import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask} from './redux/apiCalls'
import moment from 'moment'



function ShowAddTask({task, isEditing, setIsEditing}){
    const [showButton, setShowButton] = useState(false)

    const handleShowTask = () => {

        setShowButton(!showButton)

    }

    return(
        <>
            <Container className='mt-5'>
                <Row>
                    <Col md={8} className='mx-auto'>
                        <Button onClick={handleShowTask} variant="danger" type='button'>Add Task {!showButton ? <span> + </span> : <span> - </span>}</Button>
                    </Col>
                </Row>
            </Container>

            {(showButton || isEditing) && <AddTask task={task} isEditing={isEditing} setIsEditing={setIsEditing} setShowButton={setShowButton} />}

        </>
    )
}


function AddTask({task, isEditing, setIsEditing, setShowButton}) {

    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.task.taskList);

    let currentDate = moment(task?.completionDate).format('YYYY-MM-DD')

    const [taskName, setTaskName] = useState(isEditing ? task.taskname : "");
    const [taskDate, setTaskDate] = useState(isEditing ? currentDate : "");
    const [taskTime, setTaskTime] = useState(isEditing ? task.completionTime: "");
    const [username, setUsername] = useState(isEditing ? task.username : "");

    const handleSubmit = (e) => {
        // e.preventDefault()

        const task_to_add = {
            taskname: taskName, 
            username: username, 
            completionDate: taskDate,
            completionTime:taskTime
        }

        isEditing ? updateTask(task._id, task_to_add, dispatch) : addTask(task_to_add, dispatch);

        setShowButton(false)
        setIsEditing(false)
    }

  return (
    <>
        <Container className='mt-5'>
            <Row>
                <Col md={8} className='mx-auto'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter TaskName:</Form.Label>
                            <Form.Control type="text" value={taskName || " "} name="task" placeholder="Enter Task Name" required onChange={(event) => {setTaskName(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Completion Date:</Form.Label>
                            <Form.Control type="date" value={taskDate || " "}  onChange={(event) => {setTaskDate(event.target.value)}}/>  
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Completion Time:</Form.Label>
                            <Form.Control type="time" value={taskTime || " "} onChange={(event) => {setTaskTime(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name of Task Executor:</Form.Label>

                            {isEditing ? <Form.Select value={username} onChange={(event) => {setUsername(event.target.value)}}>
                                    {/* <option value="none" selected disabled hidden>Select an Option</option> */}
                                {
                                    
                                    taskList.map((task) => {
                                        return (
                                            <>
                                            <option value={task.username}>{task.username}</option>
                                            </>
                                        )
                                    })
                                } 
                            </Form.Select> :

                            
                            <Form.Control type="text" value={username || " "} placeholder="Enter the User to Execute Task" onChange={(event) => {setUsername(event.target.value)}}/>
                            
                            
                            }
                            
                        </Form.Group>
                        <div className='d-grid mt-3'>
                            <Button type='submit' variant="primary">{isEditing ? "Update Task" : "Add Task"} </Button>
                        </div>
                    </Form>
                </Col>
            </Row>   
        </Container>
    </>  
  )
}

export default ShowAddTask
import {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import ShowAddTask from './AddTask'
import {getTasks, deleteTask} from './redux/apiCalls'

// display table
function TableDisplay ({task, handleDelete, handleEdit}) {
    
      return (

            <>
                <tr>
                    {/* <td>{task.id}</td> */}
                    <td>{task.username}</td>
                    <td>{task.taskname}</td>
                    <td>{new Date(task.completionDate).toDateString()}</td>
                    <td>{task.completionTime}</td>
                    <td>
                        <i className='pe-2' onClick={() => handleEdit(task)}><FontAwesomeIcon icon={faEdit}/></i>
                        <i onClick={() => handleDelete(task._id)}><FontAwesomeIcon icon={faTrash}/></i>
                    </td>
                </tr>
            </>

    )
    
}

// 
function AllTask() {
    const[isEditing, setIsEditing] = useState(false)
    const[currentTask, setcurrentTask] = useState(null)
    const dispatch = useDispatch();
    const taskList = useSelector((state) => state.task.taskList);

    // console.log(taskList)

    useEffect(() => {
        getTasks(dispatch);
      }, [dispatch, isEditing]);

    const handleEdit = (task) => {
        setcurrentTask(task)
        setIsEditing(true)
    }

    const handleDelete = (id) => {
        deleteTask(id, dispatch);
    }



  return (
    <>
        <Container className='mt-5'>
            <Row>
                <Col md={12} className='mb-5'>
                    <ShowAddTask task={currentTask} isEditing={isEditing} setIsEditing={setIsEditing}/>
                </Col>
                <Col md={8} className='mx-auto'>
                    <h3>Listed Tasks</h3>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                            {/* <th>#</th> */}
                            <th>User</th>
                            <th>Task</th>
                            <th>Date</th>
                            <th>Completion Time</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { taskList.map((task) => (
                                    <TableDisplay task={task} key={task._id} handleDelete={handleDelete} handleEdit={handleEdit} />
                                )  
                            )}  
                        </tbody>
                    </Table>
                </Col>
            </Row>   
        </Container>
    </>  
  )
}

export default AllTask
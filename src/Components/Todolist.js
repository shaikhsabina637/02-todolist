import React, { useEffect, useState } from 'react';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

function Todolist() {
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [todo, setTodo] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const[iscompleted,setisCompleted]=useState([]);
    const[todoClicked,setTodoClicked]=useState(false);

    // Function to add or edit a todo item
    const addOrEditTodo = (e) => {
        e.preventDefault();

        const newTodo = {
            title: title,
            discription: discription
        };
        if (title.trim() === "" || discription.trim() === "") {
            return;
        }
        if (editIndex !== null) {
            const updatedTodo = [...todo];
            updatedTodo[editIndex] = newTodo;
            setTodo(updatedTodo);
            localStorage.setItem("todos",JSON.stringify(updatedTodo))
            setEditIndex(null);
        } else {
            setTodo([...todo, newTodo]);
            localStorage.setItem("todos", JSON.stringify([...todo, newTodo]));
        }

     

        setTitle("");
        setDiscription("");
    };

    // Function to delete a todo item
    const deleteTodo = (index) => {
        let updatedTodo = [...todo];
        updatedTodo.splice(index, 1);
        setTodo(updatedTodo);
        localStorage.setItem("todos", JSON.stringify(updatedTodo));
    };

    // Function to edit a todo item
    const editTodo = (index) => {
        setTitle(todo[index].title);
        setDiscription(todo[index].discription);
        setEditIndex(index);
    };
    //  completed todo
    const completedTodo=(index)=>{
        let newDate=new Date();
        let year=newDate.getFullYear();
        let month=newDate.getMonth();
        let date=newDate.getDate();
        // let day=newDate.getDay();
        let minute=newDate.getMinutes();
        let hour=newDate.getHours()
        let seconds=newDate.getSeconds();
        let completedOn=`Completed on:${date}-${month+1}-${year} at ${hour-12}h ${minute}m ${seconds}s`;
        let filterItems={
            ...todo[index],
            completedOn:completedOn
        }
      let completedTodo=[...iscompleted];
      completedTodo.push(filterItems);
      setisCompleted(completedTodo);
      deleteTodo(index);
      localStorage.setItem("isCompletedItems",JSON.stringify(completedTodo))
      
    }
    // deleteCompletedTodo
    const deleteCompletedTodo=(index)=>{
       let updateCompletedTodo=[...iscompleted]
       updateCompletedTodo.splice(index,1)
       setisCompleted(updateCompletedTodo);
       localStorage.setItem("isCompletedItems",JSON.stringify(updateCompletedTodo))
      
    }
    useEffect(() => {
        const getTodoFromLocalStorage = () => {
            const storedTodo = localStorage.getItem('todos');
            const iscompletedData=localStorage.getItem("isCompletedItems")
            if (storedTodo) {
                setTodo(JSON.parse(storedTodo));
            } else {
                setTodo([]);
            }
            if (iscompletedData) {
                setisCompleted(JSON.parse(iscompletedData));
            } else {
                setisCompleted([]);
            }
        };
        getTodoFromLocalStorage();
    }, []);

    return (
        <>
            <div className='flex justify-center flex-col items-center p-3'>
                <h2 className='lg:text-3xl font-bold text-white bg-gray-500 w-[40vw] capitalize p-2 text-center rounded-xl mb-2'>my todos</h2>
                <div className='bg-gray-500 flex flex-col p-4  rounded-md overflow-auto '>
                    <div className='m-2 p-2 flex lg:flex-row justify-center sm:flex-col '>
                        <div className='flex flex-col p-2 sm:m-1'>
                            <label className='uppercase font-bold lg:p-1 sm:p-1'>title</label>
                            <input className='p-2 rounded-md lg:w-[20vw] sm:w-[60vw] placeholder:uppercase' type="text" placeholder="enter the title of todo" onChange={(e) => setTitle(e.target.value)} value={title}/>

                        </div>
                        <div className='flex flex-col m-2 p-2 sm:m-1'> 
                            <label className='uppercase font-bold lg:p-1 sm:p-1'>description</label>
                            <input className='p-2 rounded-md lg:w-[20vw] sm:w-[60vw] placeholder:uppercase ' type="text" placeholder="enter the description of todo" onChange={(e) => setDiscription(e.target.value)} value={discription}/>
                        

                        </div>
                        <div className='flex justify-center flex-col m-2 p-2'>
                            <button className='border-1 p uppercase rounded-xs sm:p-1 sm:w-[25vw] lg:w-[6vw] relative top-4 sm:rounded-md bg-green-500' onClick={addOrEditTodo}>Save</button>
                        </div>
                    </div>
                    <div className='p-3'>
                    <button className={`border-1 p-2 uppercase rounded-sm ${todoClicked ? '' : 'bg-green-500'}`} onClick={() => setTodoClicked(false)}>to do</button>
                     <button className={`border-1 p-2 uppercase rounded-sm ${todoClicked ? 'bg-green-500' : ''}`} onClick={() => setTodoClicked(true)}>completed</button>
                    </div>
                    { todoClicked===false && todo.map((item, index) => (
                        <div className='bg-gray-300 shadow-2xl p-2 rounded-md flex justify-between items-center mb-2' key={index}>
                            <div className='p-2 lg:w-[30vw] sm:w-[50vw]'>
                                <h2 className='font-bold text-xl text-green-500 uppercase sm:text-sm'>{item.title}</h2>
                                <p className='capitalize sm:text-sm text-gray-400'>{item.discription}</p>
                            </div>
                            <div className='flex p-2 lg:w-[7vw] justify-evenly items-center sm:w-[20vw]'>
                                <MdEditSquare className='lg:text-xl text-black sm:text-3xl' onClick={() => editTodo(index)}/>
                                <RiDeleteBin7Fill className='lg:text-xl sm:text-3xl' onClick={() => deleteTodo(index)} />
                                <TiTick className='lg:text-xl sm:text-3xl text-green-500' onClick={()=>completedTodo(index)} />
                            </div>
                        </div>
                    ))}
                     { todoClicked===true && iscompleted.map((item, index) => (
                        <div className='bg-gray-300 shadow-2xl p-2 rounded-md flex justify-between items-center mb-2' key={index}>
                            <div className='p-2 lg:w-[30vw] sm:w-[50vw] '>
                                <h2 className='font-bold text-xl text-green-500 uppercase sm:text-sm'>{item.title}</h2>
                                <p className='capitalize sm:text-sm text-gray-400'>{item.discription}</p>
                                <h1 className='text-white  sm:text-sm'>{item.completedOn}</h1>
                            </div>
                            <div className='flex p-2 lg:w-[7vw] justify-evenly items-center sm:w-[20vw]'>
                                <RiDeleteBin7Fill className='lg:text-xl sm:text-3xl' onClick={() => deleteCompletedTodo(index)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Todolist;

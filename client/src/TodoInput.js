import TodoList from "./TodoList";
import { useState ,useEffect} from "react";
import Axios from "axios";

const TodoInput = () => {
  const [usertask, setUsertask] = useState("");

  const getinputvalue = (event) => {
    setUsertask(event.target.value);
  };

  const [tasks, setTasks] = useState([]);

  const [alltasks, setAlltasks] = useState([]);

  const getTasks = () => {
    
    Axios.get("http://localhost:5000/tasks").then((response) => {
      setAlltasks(response['data'])
      setTasks(response['data'])
    });
    
  }

  useEffect(() => {
    getTasks();
  }, []);
  

  const handletaskaddition = () => {
    if (usertask === "") {
      console.log(`Can't Add Empty Task`);
      return;
    }
    // if (tasks.length !== 0 && tasks.at(0).title === "task1") {
    //   const newtask = tasks.at(0);
    //   newtask.title = usertask;
    //   newtask.id = 0;
    //   newtask.progress = "todo";
    //   const newtasks = tasks.filter((task) => true);
    //   newtasks.pop();
    //   newtasks.push(newtask);

    //   Axios.post("http://localhost:4200/AddTask", {
    //     usertask: usertask,
    //   }).then(() => console.log("success"));

    //   setTasks(newtasks);
    //   setAlltasks(newtasks);
    //   return;
    // }
    let newid = 0;
    if (tasks.length !== 0) newid = tasks.at(tasks.length - 1).id + 1;

    const newtask = { title: usertask, id: newid, progress: "todo" };
    const newtasks = tasks.filter((task) => true);
    newtasks.push(newtask);
    setTasks(newtasks);
    setAlltasks(newtasks);

    Axios.post("http://localhost:5000/AddTask", {
      usertask: usertask,
    }).then(() => console.log("success"));
  };

  const handledeletetask = (id) => {
    const newtasks = tasks.filter((task) => task.id !== id);

    Axios.post("http://localhost:5000/deletetask", {
      id:id,
    }).then(() => console.log("deleted successfully"));

    setTasks(newtasks);
    setAlltasks(newtasks);
  };

  const handlechecktask = (id) => {
    const newtasks = tasks.map((task) => {
      if (task.id === id) {
        if (task.progress === "done") task.progress = "todo";
        else task.progress = "done";
      }
      Axios.post("http://localhost:5000/checktask", {
        progress: task.progress,
        id:task.id
      }).then(() => console.log("successs"));
      return task;
    });
    
    setTasks(newtasks);
    setAlltasks(newtasks);
  };

  const handledeletealltasks = () => {
    const newtasks = tasks.filter((task) => false);
    setTasks(newtasks);
    setAlltasks(newtasks);
  };

  const handledeletedonetasks = () => {
    const newtasks = tasks.filter((task) => task.progress === "todo");
    setTasks(newtasks);
    setAlltasks(newtasks);
  };

  const handledonebutton = () => {
    const tmpdonetasks = alltasks.filter((task) => task.progress === "done");
    setTasks(tmpdonetasks);
  };
  const handletodobutton = () => {
    const tmptodotasks = alltasks.filter((task) => task.progress === "todo");
    setTasks(tmptodotasks);
  };
  const handelalltasksbutton = () => {
    const tmpalltasks = alltasks.filter((task) => true);
    setTasks(tmpalltasks);

  };

  return (
    <div className="Input">
      <h1>TodoInput</h1>

      <div className="addtask">
        <img
          src="https://th.bing.com/th/id/OIP.uQlB7AC1-RNXr-jN512JTQHaGH?pid=ImgDet&rs=1"
          id="addtaskimg"
          alt=""
        />
        <input
          type="text"
          id="newtodo"
          placeholder="  New Todo"
          // onChange={getinputvalue}
          onChange={getinputvalue}
        />
        <button className="btn" id="addtaskbutton" onClick={handletaskaddition}>
          Add New Task
        </button>
      </div>

      <TodoList
        tasks={tasks}
        handledeletetask={handledeletetask}
        handledeletealltasks={handledeletealltasks}
        handlechecktask={handlechecktask}
        handledeletedonetasks={handledeletedonetasks}
        handledonebutton={handledonebutton}
        handletodobutton={handletodobutton}
        handelalltasksbutton={handelalltasksbutton}
      />
    </div>
  );
};

export default TodoInput;

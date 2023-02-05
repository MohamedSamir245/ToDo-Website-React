const TodoList = ({
  tasks,
  handledeletetask,
  handledeletealltasks,
  handlechecktask,
  handledeletedonetasks,
  handledonebutton,
  handletodobutton,
  handelalltasksbutton,
}) => {
  return (
    <div className="list">
      <h1>TodoList</h1>
      <div className="listbuttons">
        <button className="btn" id="all" onClick={handelalltasksbutton}>
          All
        </button>
        <button className="btn" id="done" onClick={handledonebutton}>
          Done
        </button>
        <button className="btn" id="Todo" onClick={handletodobutton}>
          Todo
        </button>
        {tasks.map((ele) => (
          <div className="task-preview" key={ele.id}>
            <span id={ele.id} className={ele.progress}>
              {ele.title}
            </span>
            <input
              type="checkbox"
              className="divcheckbox"
              checked={ele.progress === "done" || false}
              id={ele.id}
              

              onClick={() => {
                handlechecktask(ele.id);
              }}
            ></input>
            <button className="divbutton">✏️</button>
            <img
              src="https://th.bing.com/th/id/OIP.L01Y-6m-15meR99jYqIx3wAAAA?pid=ImgDet&rs=1"
              className="taskimg"
              alt="trash img"
              onClick={() => handledeletetask(ele.id)}
            />
            {/* <span className="checkmark"></span> */}
          </div>
        ))}
        <button className="btn" id="deletedone" onClick={handledeletedonetasks}>
          Delete done tasks
        </button>
        <button className="btn" id="deleteall" onClick={handledeletealltasks}>
          Delete all tasks
        </button>
      </div>
    </div>
  );
};

export default TodoList;

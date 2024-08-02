import TaskCard from "./TaskCard";



async function loadTasks() {
   const res =await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/`)
   const tasks =await res.json() 
   return tasks;
}


async function ListTask() {
    const tasks = await loadTasks()

    



    return(
        <div className="bg-slate-700 p-4 w-full">
            
            <h1>LISTA DE MOTOS</h1>

            {tasks.map((task) => (
                
                  <TaskCard task={task} key={task.id}></TaskCard>
        
            ))}
        </div>
        
    )

}


export default ListTask
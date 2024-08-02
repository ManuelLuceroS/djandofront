const { default: FormTask } = require("./components/FormTask");
const { default: ListTask } = require("./components/ListTask");
export const dynamic ="force-dynamic";

function HomePage() {
    return(
        
        <div className="container mx-auto">
            <h1>MOTO APP</h1>

            <div className="flex gap-x-10">

                <ListTask></ListTask>
                <FormTask></FormTask>
           
            </div>
        </div>
    )
    
}

export default  HomePage
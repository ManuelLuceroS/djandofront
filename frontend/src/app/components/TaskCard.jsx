"use client"
import { Content } from 'next/font/google'
import {useRouter} from 'next/navigation'
import {useState} from 'react'


function TaskCard({task}){

    const router =useRouter()
    const [edit, setEdit]=useState(false)

    const [newreference, setnewreferenca]= useState(task.reference);
    const [newtrademark, setnewtrademark]= useState(task.trademark);
    const [newmodel, setnewmodel]= useState(task.model);
    const [newprice, setnewprice]= useState(task.price);
    const [newimage, setnewimag]= useState(task.image);
    const [newsupplier, setnewsupplier]= useState(task.supplier);
   


    const handleDelete =async (id)=>{
           if (window.confirm('¿quieres eliminar esta tarea?')){
        const res= await  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/${id}/`,{
            method: "DELETE",
           })

           if (res.status===HTTP_204_NO_CONTENT){
            router.refresh();
           }
    }
};

const handleUpdate= async (id)=> {
   const res=  await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}api/${id}/`, {
        method: "PUT",
        body:  JSON.stringify({reference: newreference, trademark: newtrademark, model: newmodel, price: newprice, image: newimage, supplier: newsupplier}),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    setnewreferenca(data.reference);
    setnewtrademark(data.trademark);
    setnewmodel(data.model);
    setnewprice(data.price);
    setnewimag(data.image);
    setnewsupplier(data.supplier);
    setEdit(false);
}
    return(

    <div className="bg-slate-500 px-4 py-3 mb-2 rounded-md text-slate-200  items-center">
            
                
                 {
                    !edit ? (
                        <div className='flex flex-col'>
                    <p>{newreference}</p>
                    
                    </div>
                    ) :(
                          <input type="text" placeholder={task.reference} className="p-2 bg-slate-500 border-none outline-none text-indigo-400" onChange={e=> setnewreferenca (e.target.value)}></input>
                    )
                 }   

                 {
                    !edit ? (
                        <div className='flex flex-col'>
                   
                    <p>{newtrademark}</p>
                    
                    </div>
                    ) :(
                          <input type="text" placeholder={task.trademark} className="p-2 bg-slate-500 border-none outline-none text-indigo-400" onChange={e=> setnewtrademark (e.target.value)}></input>
                    )
                 }
                
                {
                    !edit ? (
                        <div className='flex flex-col'>
                    
                    <p>{newmodel}</p>
                   
                    </div>
                    ) :(
                          <input type="text" placeholder={task.model} className="p-2 bg-slate-500 border-none outline-none text-indigo-400" onChange={e=> setnewmodel (e.target.value)}></input>
                    )
                 }
                 {
                    !edit ? (
                        <div className='flex flex-col'>
                    
                    <p>{newprice}</p>
                    
                    </div>
                    ) :(
                          <input type="text" placeholder={task.price} className="p-2 bg-slate-500 border-none outline-none text-indigo-400" onChange={e=> setnewprice (e.target.value)}></input>
                    )
                 }
                 {
                    !edit ? (
                        <div className='flex flex-col'>
                    
                    <p>{newimage}</p>
                    
                    </div>
                    ) :(
                          <input type="file" placeholder={task.image} className="p-2 bg-slate-500 border-none outline-none text-indigo-400" onChange={e=> setnewimag (e.target.value)}></input>
                    )
                 }
                 {
                    !edit ? (
                        <div className='flex flex-col'>
                    
                    <p>{newsupplier}</p>
                    </div>
                    ) :(
                          <input type="text" placeholder={task.supplier} className="p-2 bg-slate-500 border-none outline-none text-indigo-400" onChange={e=> setnewsupplier (e.target.value)}></input>
                    )
                 }


                

                    <div className="flex justify-between gap-x-2">

                        {
                            edit &&(
                                <button className='bg-indigo-500 text-white rounded-md p-2' onClick={()=> handleUpdate(task.id)}>Guardar cambios </button>
                            )
                        }
                        <button className="bg-red-500 text-white rounded-md p-2" onClick={()=> handleDelete(task.id)}>Eliminar</button>
                        <button className="bg-indigo-500 text-white rounded-md p-2" onClick={()=> setEdit(!edit)}>Actualizar</button>
                    </div>
                    
                
        
            
        </div>
    )
}

export  default TaskCard
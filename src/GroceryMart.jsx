import { useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';

function GroceryMart() {
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);

    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim())
            return;

        const newItem = {
            id: Date.now(),
            text: input
        }
        setItems([...items, newItem]);
        setInput("");
        inputRef.current.focus();

        toast.success("Item Added To The List");
    }

    function handleDelete(Id) {
        setItems(items.filter((item) => {
            return item.id !== Id;
        }))
        toast.error("Item deleted.");

    }
    
    function toggleComplete(Id){
        setItems(items.map((item) =>{
            return item.id === Id  ? { ...item , completed : !item.completed } : item ;
        }))

    }



    return (
        <>
            <div className="fullPage">

                <div className="grocery-bud">
                    <h1 className="grocery-heading">Grocery Bud</h1>
                    <form className="input-form" action="" onSubmit={handleSubmit}>
                        <input className="input"
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)
                            } />
                        <button type="submit" className="btn">
                            Add item</button>
                    </form>
                    <div className="items">
                        {items.map((item) => (

                            <div className="perItem" key={item.id}>

                                <div className="Item-name">
                                    <input type="checkbox" 
                                    onChange = {()=> toggleComplete(item.id)}/>
                                    <p style ={{textDecoration : item.completed ? "line-through" : "none"}} >{item.text}</p>
                                </div>
                                <button id="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>


            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </>
    )
}
export default GroceryMart;


import React from "react";
import { useState, useEffect } from "react";

const TodoFetch = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        getTodos(); //Ejecutamos la función "getTodos".
    }, []); //El array de dependencias vacío hace que "getTodos" se ejecute solo cuando "useEffect" se monte.

    const urlTodos = "https://playground.4geeks.com/todo/"

    function getTodos() { //Función para obtener los datos del servidor.
        fetch(urlTodos + "users/Elroro23", { //Especificamos la "url" en el fetch
            method: "GET", //Método, en este caso solicitamos información de nuestro usuario.
        })
            .then(response => response.json()) //Convertimos la respuesta en un objeto "json".
            .then((data) => { //Objeto "json"
                setTodos(data.todos); //"setTodos" actualiza "todos" con la "data" obtenida de "json".
            })
            .catch((err) => { //Si surge algún error ".cath()" me avisa.
                console.error(err);
            });
    }
    function addTodo() {
        let newTodo = { //Creamos un objeto que tiene tiene como propiedad "label" que posee el valor actual del campo de entrada "inputValue".
            label: inputValue,
            is_done: false
        }
        fetch(urlTodos + "todos/Elroro23", {
            method: "POST",  //Vamos agregar tareas a la base de datos por eso utilizamos "post".
            body: JSON.stringify(newTodo), //Convertimos nuestro objeto "newTodo" a "json".
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json()) //Convierte la respuesta a "json".
            .then(() => {
                getTodos(); //Llama a "getTodos" para actualizar la lista con los datos más recientes.
                setInputValue(""); //Limpia el campo de texto.
            })
            .catch((err) => {
                console.error(err);
            });
    }
    function deleteTodo(todoId) { //Función para eliminar cada tarea.
        fetch(urlTodos + `todos/${todoId}`, { //mediante su "id"
            method: "DELETE",
        })
            .then(() => {
                getTodos();
            })
            .catch((err) => {
                console.error(err);
            });
    }
    const handleKeyDown = (e) => { //Si le damos "Enter" y el campo de texto no está vacío ejecuta "addTodo".
        if (e.key === "Enter" && inputValue.trim() !== "") {
            addTodo();
        }
    };

    const handleDelete = (todoId) => { //le pasamos el "id" de cada tarea como parámetro.
        deleteTodo(todoId) //Llamamos a la función para eliminar cada tarea
    };
    return (

        <div className="text-center container mt-5">
            <h1>TODO'S</h1>
            <label htmlFor="exampleInputEmail1" className="form-label"></label>
            <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} //Actualiza el estado inputValue con el valor del campo de entrada.
                onKeyDown={handleKeyDown} // Llama a handleKeyDown cuando se presiona la tecla "Enter" en el campo de entrada.
            />
            {todos.map(todo => (
                <div key={todo.id} className="todo-list">
                    <p style={{ display: 'inline', marginRight: '10px' }}>{todo.label}</p> {/* Muestra la propiedad label del todo */}
                    <i className="fa-solid fa-trash"
                        onClick={() => handleDelete(todo.id)} //Pasamos el id de cada tarea a "handleDelete"
                        style={{ cursor: 'pointer', color: 'red' }}></i>
                </div>
            ))}
        </div>
    );
}
export default TodoFetch;
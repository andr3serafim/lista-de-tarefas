import { useState, useEffect } from 'react'
import './todo-list.css'
import icon from './assets/icon.png'

function TodoList() {
    
    const listaStorage = localStorage.getItem('Lista')
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState('')

    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    },[lista])

    function handleSubmit(form) {
        form.preventDefault();
        if (!novoItem) {
            return
        }
        setLista([...lista, { text: novoItem, isCompleted: false }])
        setNovoItem('');
        document.getElementById('input-entrada').focus();
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux)
    }

    function deletar(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux)
    }

    function deleteAll() {
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de tarefas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name=""
                    id=""
                    placeholder='Adicione uma tarefa'
                    value={novoItem}
                    onChange={e => setNovoItem(e.target.value)} />
                <button type="submit">Adicionar</button>
            </form>
            <div className="lista-tarefas">
                {
                    lista.length < 1
                        ?
                        <img src={icon} />
                        :
                        lista.map((item, index) => (
                            <div key={index} className={item.isCompleted ? "item-completo" : "item"}>
                                <span onClick={() => clicou(index)}>{item.text}</span>
                                <button className='del' onClick={() => deletar(index)}>Apagar</button>
                            </div>
                        ))
                }
                {
                    lista.length > 1 &&
                    <button className='delete-all' onClick={() => deleteAll()}>Apagar todas</button>
                }
                
            </div>
        </div>
    )
}

export default TodoList
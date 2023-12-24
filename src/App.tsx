import { useState, useEffect, MouseEvent } from 'react';

function App() {
  // хук - это api для функций react

  //Хук useState возвращает массив из двух значений, первое мз которых это просто переменная, а второе - это функция для изменения значения это переменной (ВАЖНО!!! саму переменную изменять нельзя)
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");


  //Хук useEffect - это функция, котрая вызывает callback функцию при первом рендере и при изменении зависимостей

  /*
    useEffect( - вызов хука
      () => { - объявление и начало тела callback функции

      }, - конец тела callback функции
      [] - массив зависимостей
    )
  */
  useEffect(() => {
    getTasksFromStorage();
  }, [])


  //функция для получения списка задач из localstorage
  const getTasksFromStorage = () => {
    const data = localStorage.getItem("tasks"); //получаем данные из localstorage по ключу "tasks"
    setTasks(data ? JSON.parse(data) : []); //сохраняем данные, если они есть, в переменную tasks 
  }


  //функция для добавления новой задачи
  const addNewTask = (event: MouseEvent<HTMLButtonElement>) => {

    setTasks((prev) => {
      return [...prev, { id: event.timeStamp, text: newTask }]
    }); //добавляем новую задачу в массив tasks, в виде { id: время, text: текст }

    localStorage.setItem("tasks", JSON.stringify([...tasks, { id: event.timeStamp, text: newTask }])); //добавляем новую задачу в localstorage по ключу "tasks", в виде { id: время, text: текст }
    setNewTask(""); //очищаем поле ввода
  }


  //фунция удаления задачи
  const removeTask = (id: string) => { //принимает аргументом id задачи
    const data = tasks.filter(task => task.id != id); //получаем список задач без задачи, которую надо удалить, с помощью фильтра
    setTasks(data); //сохраняем полученный список в массив tasks
    localStorage.setItem("tasks", JSON.stringify(data)); //сохраняем полученный список в localstorage
  }


  return ( // выводим на экран интерфейс
    <div className='container'>
      <h1>
        Добавить новую задачу:
      </h1>
      <div className='newTask'>
        <input value={newTask} onChange={event => setNewTask(event.target.value)} />
        <button
          onClick={addNewTask}
        >
          Добавить
        </button>
      </div>
      <h1>
        Список задач:
      </h1>

      <div className='tasks'>
        {tasks.map(task => (
          <div key={task.id} className='task'>
            <div>
              {task.text}
            </div>
            <button
              onClick={() => removeTask(task.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

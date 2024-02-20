async function metodGetUsers() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos')
    xhr.send()

    xhr.onload = async function () {
        let todos = JSON.parse(xhr.response);
        
        if (todos && Array.isArray(todos) && todos.length > 0) {
            let usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            let users = await usersResponse.json();

            for (const todo of todos) {
                let user = users.find(u => u.id === todo.userId);

                if (user) {
                    let row = '<tr>'
                    row += '<td>' + todo.id + '</td>'
                    row += '<td>' + user.name + '</td>'
                    row += '<td>' + todo.title + '</td>'
                    row += '<td><input type="checkbox" ' + (todo.completed ? 'checked' : '') + '></td>'
                    row += '</tr>'
                    $('table tbody').append(row)
                }
            }
        }
    }
}

// É uma convenção usar como route "/api/v1", dessa forma quando você atualizar a API, basta usar /api/v2

// basic routes:

//app.get("/api/v1/tasks")        - get all tasks
//app.post("/api/v1/tasks")       - create new task
//app.get("/api/v1/tasks/:id")    - get detail about one task
//app.patch("/api/v1/tasks/:id")  - update task
//app.delete("/api/v1/tasks/:id") - delete task

// Começe criando o Router e os controllers, e depois os conecte
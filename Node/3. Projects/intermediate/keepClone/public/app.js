const container = document.getElementById("work-arround");
const alertDIV = document.getElementById("msg");
const formDOM = document.getElementById("form");
const titleDOM = document.getElementById("title");
const noteDOM = document.getElementById("note");
const statusDOM = document.getElementById("status");
const submitDOM = document.getElementById("submit-btn");
const feedbackDOM = document.getElementById("feedback");
const username = document.getElementById("user-name");
const logOut = document.getElementById("log-out");
const notesContainer = document.getElementById("notes-container");
const token = localStorage.getItem("token");

const showTask = async () => {
    try {
        const token = localStorage.getItem("token");
        if(!token) throw new Error("conecte-se para usar o app");
        const {
            data: { allNotes },
        } = await axios.get('/api/v1/notes', { params: { token: token }})
        const htmlNotes = allNotes.map((note) => {
            const {content, title, status, _id} = note;
            return `<div id="note-component">
                        <div id="note-title">${title}</div>
                        <div id="note"><p>
                            ${content}
                        </p></div>
                        <div id="options">
                            <button class="updateBtn" id="${_id}">editar</button>
                            <p id ="status-feedback">${status}</p>
                            <button class="deleteBtn" id="${_id}">deletar</button>
                        </div>
                    </div>`
        }).join('');
        notesContainer.innerHTML = htmlNotes;
    }catch(error){
        console.log(error)
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

window.onload = () => {
    try {
        const token = localStorage.getItem("token");
        const payload = parseJwt(token);
        username.innerHTML = payload.username;
        showTask();
        
    } catch (error) {
        window.location = "/notAuthenticated";
        container.classList.add("ocult");
        alertDIV.classList.remove("ocult");
        feedbackDOM.innerHTML = "Você precisa se conectar para usar o app";
        feedbackDOM.classList.remove("ocult");
    }
}

formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const title = titleDOM.value;
        const note = noteDOM.value;
        const status = statusDOM.value;
        const token = localStorage.getItem("token");
        const data = await axios.post("/api/v1/notes", {title, note, status, token}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        showTask();

    } 
    catch (error) {
        console.log(error);
        feedbackDOM.innerHTML = error.response.data.msg;
        feedbackDOM.classList.remove("ocult");
    }
    finally{
        titleDOM.value = "";
        noteDOM.value = "";
        if(token){
            setTimeout(() => {
                feedbackDOM.classList.add("ocult");
            }, 4000)
        }
    }
})

notesContainer.addEventListener('click', async(e) => {
    const el = e.target;
    console.log(el.id)
    if(el.classList.contains("updateBtn")){
        window.location = `/editNote.html?id=${el.id}`;
    }

    if(el.classList.contains("deleteBtn")){
        try {
            await axios.delete(`/api/v1/notes/${el.id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }})
            showTask();
        } catch (error) {
            console.log(error);
        }
    }
})



logOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location = "/index.html";
})
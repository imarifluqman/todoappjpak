var a = document.getElementById('todo');
var input = document.getElementById("input");
var add = document.getElementById("add")


function inp() {
    if(input.value == "" ){
        add.setAttribute("disabled")
    };
   
         
        firebase.database().ref('todos').on('child_added',function(data){
            var db = data.val();
            // console.log(db);
            a.innerHTML += `
            <div class="item">
            <p>${db.task}</p>
            <span>
            <i class="fas fa-pen-square" onclick="edittodo(this.key)"></i>
            <i class="fas fa-trash-alt" id="${db.key}" onclick="deletetodo(this)"></i>
            </span>
            </div>
            `
        })

  
    addtask()
    input.value = ""
}


function deletetodo(e) {

    firebase.database().ref("todos").child(e.id).remove();
    // e.parentNode.parentNode.remove()
    console.log(e.id);
}

function edittodo(e) {
    var new_text = prompt("Edit", e.parentNode.firstChild.innerText)
    e.parentNode.firstChild.innerText = new_text
    if(new_text == ""){
        deletetodo(e)
    }
}

function deleteall() {
    a.innerHTML = ""
}

function addtask(){
    var todo = input.value
    var model = {};
    model.task = todo
    model.key = firebase.database().ref('todos').push().key

    firebase.database().ref('/').child('todos').push(model)
    .then(function (success) {
        // alert("Successfully Add your todo")

    }).catch(function (error) {
        alert(error)
    })
}

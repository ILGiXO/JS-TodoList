//값을 입력
//+버튼을 클릭하면, 할일이 추가
//delete 버튼을 누르면 할일이 삭제
//check 버튼을 누르면 할일이 끝나면서 밑줄
//1. check 버튼을 클릭하는 순간 true false
//2. true 이면 끝난걸로  간주하고 밑줄
//3. false이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은, 끝난아이템만,지행중탭은 진행중 아이템만
//전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode ='all';
let filterList=[];


addButton.addEventListener("click", addTask);
for(let i = 1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)})
}

function addTask(){
    let task = {
        id:randomIdGenrate(),
        taskContent: taskInput.value,
        isComplete:false
    }
    taskList.push(task);
    console.log(taskList)  
    render();  
}


function render(){
    let list=[]
    if(mode==="all"){
        list =taskList;
    }else if(mode ==="ongoing" || mode ==="done"){
        list = filterList;
    }
    resultHTML= "";
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete==true){
            resultHTML+=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toogleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }else{resultHTML +=` <div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toogleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;}
        
    }


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toogleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }render();
}

function randomIdGenrate(){
    return '_'+ Math.random().toString(36).substr(2, 16);
}

function deleteTask(id){
    for(let i = 0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }render();
}

function filter(event){
    //1.내가 선택한 탭에따라 리스트를 달리 보여준다.
    //2.
    mode = event.target.id;
    filterList=[];
    console.log("filter",mode)
    if(mode ==="all"){
        render();
    }else if(mode ==="ongoing"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i])
            }
        }
       render();
        
    }else if(mode ==="done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i])
            }
        }render();
    }
}

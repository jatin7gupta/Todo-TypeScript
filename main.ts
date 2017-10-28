interface Todo{
    name: string;
    status: string;
    id: number;
}
const ACTIVE='ACTIVE';
const DELETED='DELETED';
const COMPLETED='COMPLETED';


class TodoClass {
    todoDB: Todo[];
    static idIndex:number;
    constructor(){
        this.todoDB=[];
        TodoClass.idIndex=1;
    }
    addTodo(name:string, status:string){
        let inputElement ={
            name:name,
            status:status,
            id:this.todoDB.length+1
        };
        this.todoDB.push(inputElement);
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    }
    deleteTodo(id:number){
        this.todoDB[id].status=DELETED;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    }
    getActiceTodos(status?:string):Todo[]{
        let retVal:Todo[]=[];
        let val = JSON.parse(localStorage.getItem('KEY'))
        this.todoDB = val ? val : [];
        if(status){
            this.todoDB.forEach(function (element) {
                if(element.status===status){
                    retVal.push(element);
                }

            });
        }
        else{
            this.todoDB.forEach(function (element) {
                    retVal.push(element);
            });
        }
        return retVal;
    }
    update(id:number, name:string){
        this.todoDB[id].name=name;
        this.todoDB[id].status=ACTIVE;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    }
    activateAgain(id:number){
        this.todoDB[id].status = ACTIVE;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    }
    markCompleted(id:number){
        this.todoDB[id].status=COMPLETED;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    }
}


var todoObject = new TodoClass();

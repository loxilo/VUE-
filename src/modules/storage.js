


const storage={

    get(key){
        return JSON.parse(localStorage.getItem(key)||null);
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value)||null);
    },
    remove(){
        localStorage.removeItem(key);
    }
}



export default storage;
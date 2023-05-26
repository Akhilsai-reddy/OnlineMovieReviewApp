import axios from "axios";
import { nanoid } from "nanoid";

let currentId=nanoid()
class UserApi{

    static saveUser(user){
        user.id=currentId+1
        return new Promise(async(resolve, reject) => {
            try {
              const res= await axios.post('http://localhost:3001/users',user)  
              resolve(res)
            } catch (error) {
                reject(error)
                console.log(error.message)
            }
        })
    }

    static getUser(email,Password,cb){
        axios.post(`http://localhost:3001/users/login`,{email,Password})
        .then(response => cb(response.data))
		.catch(error => { throw error })
   
    }
    static getAdmin(values,cb){
        axios.post(`http://localhost:3001/admin/login`,{values})
        .then(response => cb(response.data))
		.catch(error => { throw error })
    }
}

export default UserApi
import axios from 'axios'
 class MoviesApi{
static getAllMoviesList(cb){
    return new Promise(async(resolve, reject) => {
        try {
           const respons= await axios.get('http://localhost:3001/movies')
           resolve(respons.data)
           cb(respons.data)
        } catch (error) {
            reject(error)
            console.log(error.message)
        }
    })
}

static addMovie(movie){
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.post('http://localhost:3001/movies',movie)
            resolve(res.data)
        } catch (error) {
            reject(error)
            console.log(error.message)
        }
    })
}
static updateMovieById(id,data){
    return new Promise(async(resolve, reject) => {
        try {
            const res= await axios.put(`http://localhost:3001/movies/${id}`,data)
            resolve(res.data)
           } catch (error) {
            reject(error)
           }
    })
}
static getSearchedMovie(search,cb){
    return new Promise(async(resolve, reject) => {
        try {
            const res= await axios.get(`http://localhost:3001/movies?q=${search}`)
            resolve(res.data)
            // cb(res.data)
            console.log(res.data)
           } catch (error) {
            reject(error)
           }
    })
}
static getMovieById(_id,cb){
    return new Promise(async(resolve, reject) => {
        try {
           const respons= await axios.get(`http://localhost:3001/movies/${_id}`)
           resolve(respons.data)
           cb(respons.data[0])
         
        } catch (error) {
            reject(error)
            console.log(error.message)
        }
    })
}

static updateReviews(id,data){
    return new Promise(async(resolve, reject) => {
        try {
            const respons= await axios.put(`http://localhost:3001/movies/${id}`,data)
           resolve(respons.data)
        } catch (error) {
            reject(error)
            console.log(error.message)
        }
    })
}

static deleteMovieById(id){
    return new Promise(async(resolve, reject) => {
        try {
          const resp=  await axios.delete(`http://localhost:3001/movies/${id}`)
            resolve(resp)
        } catch (error) {
            reject(error)
        }
    })
}
}
export default MoviesApi;
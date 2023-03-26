import React, {useState, useEffect} from 'react'
import axios from 'axios'

function DataFetching(ruta){
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(ruta)
        .then(res=>{
            console.log(res)
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    return(posts)
}

export default DataFetching
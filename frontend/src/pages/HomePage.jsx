import { useEffect } from "react"
import useProductStore from "../store/useProductStore.js"

const HomePage = () => {
    const { fetchAllProducts, data, isLoading, errorMessage } = useProductStore()
    useEffect(() => {
        fetchAllProducts()
    }, [])
    console.log(data)
    return (
        <div className='text-2xl'>HomePage123</div>
    )
}

export default HomePage
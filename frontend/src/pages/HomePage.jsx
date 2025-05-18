import { useEffect } from "react"
import useProductStore from "../store/useProductStore.js"
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react"
const HomePage = () => {
    const { fetchAllProducts, data, isLoading, errorMessage } = useProductStore()
    useEffect(() => {
        fetchAllProducts()
    }, [])
    console.log(data)
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <button className="btn btn-primary">
                    <PlusCircleIcon className=" size-5 mr-2" />
                    Add Product
                </button>
                <button className="btn btn-ghost btn-circle" onClick={fetchAllProducts}>
                    <RefreshCwIcon className="size-5" />
                </button>
            </div>
            {errorMessage && <div className="alert alert-error mb-8">{errorMessage}</div>}


            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>) : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((product)=>{
                            <div>
                                
                            </div>
                        })}
                    </div>};
        </main>
    )
}

export default HomePage
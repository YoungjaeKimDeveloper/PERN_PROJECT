import { EditIcon, TrashIcon } from 'lucide-react'
import { Link } from "react-router-dom"
const ProductCard = ({ product }) => {
    console.log("PRODUCTED LOADED")
    return (
        <div className='card bg-base-100 shadow-xl w-80 h-80'>

            <img src={product.image} alt={product.name} className='absolute top-0 left-0 w-100 h-40 object-cover w-' />

            <div className='card-body'>
                {/* Product INFO */}
                <h2 className='card-title text-lg font-semibold'>{product.name}</h2>
                <p className='text-2xl font-bold text-primary'> ${Number(product.price).toFixed(2)}</p>
                {/* CARD ACTIONS */}
                {/* Edit */}
                <Link to={`/product/${product.id}`} className='btn btn-sm btn-info btn-outline'>
                    <EditIcon className='size-4' />
                </Link>
                {/* Delete */}
                <button className='btn btn-sm btn-error btn-outline'>
                    <TrashIcon className='size-4' />
                </button>
            </div>
        </div>
    )
}

export default ProductCard
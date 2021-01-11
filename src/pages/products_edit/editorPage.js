import React, { useEffect, useRef, useState } from 'react'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import PenSVG from 'assets/svgComponents/penSVG'
import TrashSVG from 'assets/svgComponents/trashSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import DownSVG from 'assets/svgComponents/downSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'

const initialState = {
    id: '',
    description: '',
    pcode: '',
    description_mon: ''
}

const translation = {
    id: 'ID',
    description_mon: 'Бүтээгдэхүүн',
    pcode: 'Код',
    description: 'Product'
}

function ProductsEditor() {
    const [products, setProducts] = useState([])

    const [sort, setSort] = useState({
        by: 'id',
        asc: true
    })

    const sortBy = (by) => setSort({
        by: by,
        asc: by === sort.by ? !sort.asc : true
    })

    const compare = (a, b) => {
        if (a[sort.by] > b[sort.by]) {
            return sort.asc ? 1 : -1
        } else if (a[sort.by] < b[sort.by]) {
            return sort.asc ? -1 : 1
        } else if (a[sort.by] === null) {
            return sort.asc ? 1 : -1
        } else if (b[sort.by] === null) {
            return sort.asc ? -1 : 1
        } else return 0
    }

    const filter = (obj) => {
        if (obj && filterBy) {
            const str = ('' + obj[filterBy]).toLowerCase()
            return str.includes(search.toLowerCase())
        } else {
            return true
        }
    }

    const [search, setSearch] = useState('')

    const [filterBy, setFilterBy] = useState('id')

    const [modal, setModal] = useState({
        open: false,
        id: ''
    })

    const [temp, setTemp] = useState(initialState)

    const openEdit = (id) => {
        setModal({
            open: true,
            id: id
        })
        setTemp({
            id: id,
            description: products.filter(obj => obj.id === id)[0].description,
            pcode: products.filter(obj => obj.id === id)[0].pcode,
            description_mon: products.filter(obj => obj.id === id)[0].description_mon
        })
    }

    const openCreate = () => {
        setModal({
            open: true,
            id: ''
        })
        setTemp(initialState)
    }

    const handleInput = e => {
        setTemp({ ...temp, [e.target.name]: e.target.value })
    }

    const [confirm, setConfirm] = useState({
        open: false,
        id: ''
    })

    const openConfirm = (id) => setConfirm({
        open: true,
        id: id
    })

    useEffect(() => {
        fetch('http://192.168.88.78:3000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data.data.docs))
    }, [])

    const handleCreate = (id) => {
        // fetch()
    }

    const handleDelete = (id) => {
        // fetch()
    }

    const handleUpdate = (id) => {
        // fetch()
    }

    const [dropdown, setDropdown] = useState(false)
    const dropdownRef = useRef()
    const buttonRef = useRef()

    const handleClickOutside = e => {
        if (dropdown && !dropdownRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setDropdown(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    })

    return (
        <div className="w-full max-w-7xl mx-auto text-gray-700 h-screen overflow-hidden flex flex-col px-6">
            <div className="mt-10 mb-6">
                <div className="inline-flex w-full sm:w-auto min-w-min items-center rounded-full px-3 py-2 bg-gray-100 shadow-md">
                    <SearchSVG className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <input className="flex-grow sm:w-96 bg-white text-sm outline-none py-1 px-2 ml-2 focus:border-blue-600 transition duration-300" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="">
                        <button className="whitespace-nowrap text-sm font-semibold py-1 pl-2 ml-2 focus:outline-none flex justify-between items-center rounded-md active:bg-gray-200" ref={buttonRef} onClick={() => setDropdown(!dropdown)}>
                            {translation[filterBy]}
                            <DownSVG className="w-4 h-4 text-blue-600 ml-1 mr-2 animate-pulse" />
                        </button>
                        <div className={`absolute transform translate-y-2 z-10 bg-white rounded-md shadow-md divide-y divide-dashed ${dropdown ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300`} ref={dropdownRef}>
                            {
                                products[0] && Object.keys(translation).map(key => <div className="text-sm font-semibold py-2 pl-2 pr-8 hover:bg-blue-100" onClick={() => { setFilterBy(key); setDropdown(false) }} key={key}>{translation[key]}</div>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <table className="block relative border-collapse h-3/4 rounded-md shadow-lg border border-gray-200 border-opacity-40 overflow-y-auto">
                <thead className="">
                    <tr className="h-16">
                        <th className="px-4 sticky top-0 bg-gray-100"></th>
                        <th className="sticky top-0 bg-gray-100">
                            <button className="flex items-center text-sm font-bold uppercase text-gray-500 rounded-md focus:outline-none active:bg-gray-200 py-2 px-2" onClick={() => sortBy('id')}>
                                <span className={`${sort.by === 'id' && 'text-blue-500'} transition duration-300`}>ID</span>
                                <ArrowSVG className={`w-4 h-4 transform ${sort.by === 'id' ? (sort.asc ? 'rotate-90 text-blue-600' : '-rotate-90 text-blue-600') : 'rotate-90 animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="px-4 sticky top-0 bg-gray-100">
                            <button className="flex items-center text-sm font-bold uppercase text-gray-500 rounded-md focus:outline-none active:bg-gray-200 py-2 px-2" onClick={() => sortBy('description_mon')}>
                                <span className={`${sort.by === 'description_mon' && 'text-blue-500'} transition duration-300`}>Бүтээгдэхүүн</span>
                                <ArrowSVG className={`w-4 h-4 transform ${sort.by === 'description_mon' ? (sort.asc ? 'rotate-90 text-blue-600' : '-rotate-90 text-blue-600') : 'rotate-90 animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="px-4 sticky top-0 bg-gray-100">
                            <button className="flex items-center text-sm font-bold uppercase text-gray-500 rounded-md focus:outline-none active:bg-gray-200 py-2 px-2" onClick={() => sortBy('pcode')}>
                                <span className={`${sort.by === 'pcode' && 'text-blue-500'} transition duration-300`}>Код</span>
                                <ArrowSVG className={`w-4 h-4 transform ${sort.by === 'pcode' ? (sort.asc ? 'rotate-90 text-blue-600' : '-rotate-90 text-blue-600') : 'rotate-90 animate-pulse'}`} />
                            </button>
                        </th>
                        <th className="px-4 sticky top-0 bg-gray-100">
                            <button className="flex items-center text-sm font-bold uppercase text-gray-500 rounded-md focus:outline-none active:bg-gray-200 py-2 px-2" onClick={() => sortBy('description')}>
                                <span className={`${sort.by === 'description' && 'text-blue-500'} transition duration-300`}>Product</span>
                                <ArrowSVG className={`w-4 h-4 transform ${sort.by === 'description' ? (sort.asc ? 'rotate-90 text-blue-600' : '-rotate-90 text-blue-600') : 'rotate-90 animate-pulse'}`} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-dashed">
                    {
                        products.sort(compare).filter(filter).map(item => (
                            <tr className="bg-white text-sm h-20" key={item.id}>
                                <td className="">
                                    <div className="flex items-center w-20 pl-2">
                                        <button className="p-1 focus:outline-none rounded-md active:bg-gray-200" title="Засварлах">
                                            <PenSVG className="w-5 h-5 text-blue-500 hover:text-blue-700" onClick={() => openEdit(item.id)} />
                                        </button>
                                        <button className="p-1 focus:outline-none rounded-md active:bg-gray-200" title="Устгах">
                                            <TrashSVG className="w-5 h-5 text-red-500 hover:text-red-700" onClick={() => openConfirm(item.id)} />
                                        </button>
                                    </div>
                                </td>
                                <td className="text-center">{item.id}</td>
                                <td className="">{item.description_mon}</td>
                                <td className="text-center">{item.pcode}</td>
                                <td className="">{item.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <button className="bg-green-500 focus:outline-none px-4 py-2 mt-8 font-bold text-white rounded-full self-center flex items-center hover:shadow-lg active:bg-green-600" onClick={openCreate}>
                <PlusSVG className="w-6 h-6 text-white mr-1 animate-pulse" />
                Шинээр нэмэх
            </button>

            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-700 bg-opacity-70 ${modal.open ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300`}>
                <div className="bg-white relative rounded-md shadow-lg p-4 m-2 w-full max-w-3xl">
                    <button className="border focus:outline-none text-red-500 active:text-red-700 border-red-500 rounded-md absolute top-4 right-4" onClick={() => setModal({ ...modal, open: false })}>
                        <CloseSVG className="w-8 h-8" />
                    </button>
                    <div className="mt-8 mb-2 flex flex-col">
                        <h3 className="text-xl font-bold text-center mb-4">{modal.id ? 'Засварлах' : 'Шинээр нэмэх'}</h3>
                        {temp.id && <label className="font-semibold pl-4 text-blue-600">ID: {temp.id}</label>}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                        <label className="w-full sm:w-40 min-w-min pl-2 sm:text-center font-semibold">Бүтээгдэхүүн:</label>
                        <input className="w-full sm:flex-grow min-w-min max-w-lg text-sm bg-transparent rounded-md py-2 px-2 border border-gray-300 outline-none focus:border-blue-600 transition duration-300" type="text" value={temp.description_mon} name="description_mon" onChange={handleInput} />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                        <label className="w-full sm:w-40 min-w-min pl-2 sm:text-center font-semibold">Код:</label>
                        <input className="w-full sm:flex-grow min-w-min max-w-lg text-sm bg-transparent rounded-md py-2 px-2 border border-gray-300 outline-none focus:border-blue-600 transition duration-300" type="text" value={temp.pcode} name="description_mon" onChange={handleInput} />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                        <label className="w-full sm:w-40 min-w-min pl-2 sm:text-center font-semibold">Бүтээгдэхүүн англиар:</label>
                        <input className="w-full sm:flex-grow min-w-min max-w-lg text-sm bg-transparent rounded-md py-2 px-2 border border-gray-300 outline-none focus:border-blue-600 transition duration-300" type="text" value={temp.description} name="description" onChange={handleInput} />
                    </div>
                    <button className="py-2 px-8 focus:outline-none hover:shadow-lg active:bg-green-600 bg-green-500 rounded-lg float-right mt-4 font-semibold text-white" onClick={modal.id ? handleUpdate : handleCreate}>Хадгалах</button>
                </div>
            </div>

            <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-700 bg-opacity-70 ${confirm.open ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300`}>
                <div className="bg-white relative rounded-md shadow-lg p-4 m-2 w-full max-w-xl flex flex-col border-2 border-red-600 border-opacity-80">
                    <button className="border focus:outline-none text-red-500 active:text-red-700 border-red-500 rounded-md absolute top-4 right-4" onClick={() => setConfirm({ ...confirm, open: false })}>
                        <CloseSVG className="w-8 h-8" />
                    </button>
                    <h3 className="text-xl font-bold mb-4 text-center">Устгах</h3>
                    <label className="font-semibold mb-2 pl-4 text-red-500">ID: {confirm.id}</label>
                    <p className="mb-6 font-semibold">
                        <span className="mr-1 text-red-500">"{products.filter(obj => obj.id === confirm.id)[0] && products.filter(obj => obj.id === confirm.id)[0].description_mon}"</span>
                        гэсэн бүтээгдэхүүнийг устгах уу?
                    </p>
                    <div className="flex justify-end">
                        <button className="py-2 px-8 bg-green-500 active:bg-green-600 text-white font-semibold rounded-lg mr-2 focus:outline-none hover:shadow-lg" onClick={() => setConfirm({ ...confirm, open: false })}>Болих</button>
                        <button className="py-2 px-8 bg-red-500 active:bg-red-600 text-white font-semibold rounded-lg focus:outline-none hover:shadow-lg" onClick={handleDelete}>Устгах</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsEditor

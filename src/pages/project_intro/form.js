import React, { useContext, useEffect, useState } from 'react'
import FormSmall from 'components/form_small/formSmall'
import FormTextarea from 'components/form_textarea/formTextarea'
import { useHistory } from 'react-router-dom'
import ArrowSVG from 'assets/svgComponents/arrowSVG'
import SearchSVG from 'assets/svgComponents/searchSVG'
import CloseSVG from 'assets/svgComponents/closeSVG'
import PlusSVG from 'assets/svgComponents/plusSVG'
import axios from 'axios'
import UrgudulContext from 'components/utilities/urgudulContext'


function ProjectIntro() {
    const [businessSectors, setBusinessSectors] = useState([])
    const [products, setProducts] = useState([])

    const [focusSector, setFocusSector] = useState(false)
    const [focusProduct, setFocusProduct] = useState(false)

    const [changed, setChanged] = useState(false)

    const UrgudulCtx = useContext(UrgudulContext)
    const data = UrgudulCtx.data
    const setData = UrgudulCtx.setData

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setChanged(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        axios.get('http://192.168.88.78:3000/api/business-sector')
            .then(res => {
                setBusinessSectors(res.data.data)
            }).catch(err => {
                console.log(err)
            })

        axios.get('http://192.168.88.78:3000/api/products')
            .then(res => {
                setProducts(res.data.data.docs)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const filterSector = (obj) => {
        if (obj) {
            const str = ('' + obj['bdescription_mon']).toLowerCase()
            return str.includes(searchSector.toLowerCase())
        } else {
            return true
        }
    }

    const compareSector = (a, b) => {
        if (a.bdescription_mon > b.bdescription_mon) {
            return 1
        } else if (a.bdescription_mon < b.bdescription_mon) {
            return -1
        } else return 0
    }

    const filterProduct = (obj) => {
        if (obj) {
            const str = ('' + obj['description_mon']).toLowerCase()
            return str.includes(searchProduct.toLowerCase())
        } else {
            return true
        }
    }

    const compareProduct = (a, b) => {
        if (a.description_mon > b.description_mon) {
            return 1
        } else if (a.description_mon < b.description_mon) {
            return -1
        } else return 0
    }

    const [searchSector, setSearchSector] = useState('')

    const handleFocusSector = () => {
        setSearchSector('')
        setFocusSector(true)
        setChanged(true)
    }

    const handleBlurSector = () => {
        if (businessSectors.map(obj => obj.bdescription_mon).includes(searchSector)) {
            setData({ ...data, business_sectorid: businessSectors.filter(obj => obj.bdescription_mon === searchSector)[0].id })
        } else {
            setData({ ...data, business_sectorid: '' })
            setSearchSector('')
        }
        setFocusSector(false)
    }

    const handleSelectSector = (id, desc) => {
        setData({ ...data, business_sectorid: id })
        setSearchSector(desc)
        setChanged(true)
    }

    const [searchProduct, setSearchProduct] = useState('')

    const handleFocusProduct = () => {
        setSearchProduct('')
        setFocusProduct(true)
    }

    const handleBlurProduct = () => {
        !products.map(obj => obj.description_mon).includes(searchProduct) && setSearchProduct('')
        setFocusProduct(false)
    }

    const handleAddProduct = () => {
        const id = products.map(obj => obj.description_mon).includes(searchProduct) && products.filter(obj => obj.description_mon === searchProduct)[0].id
        if (id && !data.ppsProducts.map(obj => obj.productId).includes(id)) {
            setData({ ...data, ppsProducts: [...data.ppsProducts, { productId: id }] })
            setChanged(true)
        }
    }

    const handleRemoveProduct = (index) => {
        setData({ ...data, ppsProducts: data.ppsProducts.filter((_, i) => i !== index) })
        setChanged(true)
    }

    const history = useHistory()

    const navToProjectBudget = () => {
        if (changed) {
            const body = {
                project_name: data.project_name,
                business_sectorid: data.business_sectorid,
                primary_activity: data.primary_activity,
                ppsProducts: data.ppsProducts,
                project_intro: data.project_intro,
                start_plan: data.start_plan,
                project_start: data.project_start,
                project_end: data.project_end,
            }

            axios.put(`http://192.168.88.78:3000/api/applications/${data.id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res.data)
                history.push('/page/2')
            }).catch(err => {
                console.log(err)
            })
        } else {
            history.push('/page/2')
        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto py-20 flex flex-col text-gray-700">
            <h3 className="text-xl text-gray-600 font-semibold ml-4 mb-8">
                2. Таны төсөл
            </h3>

            <form className="" onSubmit={handleSubmit}>
                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto">
                    <FormSmall label="Төслийн нэр:" type="text" value={data.project_name} name="project_name" onChange={handleInput} instruction="Төслийн нэр 10 үгнээс хэтрэхгүй. Нэр нь төслийн хүрээнд юу хийхийг тодорхойлсон байна." />

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-md last:rounded-b-md">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`min-w-min text-sm ${focusSector && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Салбар:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <div className="w-full sm:max-w flex items-center px-2 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                <SearchSVG className={`w-4 h-4 ${focusSector ? 'text-blue-700' : 'text-gray-500'} transition-colors duration-300`} />
                                <input className="flex-grow mx-2 py-2 bg-transparent text-sm outline-none" type="text" value={searchSector} onChange={e => setSearchSector(e.target.value)} onFocus={handleFocusSector} onBlur={handleBlurSector} />
                            </div>
                            <div className={`my-2 text-sm rounded-md border border-r-0 border-gray-300 shadow-sm divide-y divide-dashed overflow-y-auto ${focusSector ? 'visible opacity-100 h-60' : 'invisible opacity-0 h-0'} transition-all duration-300`}>
                                {
                                    businessSectors.filter(filterSector).sort(compareSector).length ?
                                        businessSectors.filter(filterSector).sort(compareSector).map((item, i) =>
                                            <div className='p-1 pl-2 hover:bg-blue-500 hover:text-gray-50' onMouseDown={() => handleSelectSector(item.id, item.bdescription_mon)} key={item.id}>
                                                <span className="font-semibold pr-2">{i + 1}.</span>
                                                {item.bdescription_mon}
                                            </div>) :
                                        <p className="p-1 text-xs text-center mt-4 italic opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <FormSmall label="Танай байгууллагын үндсэн үйл ажиллагаа:" type="text" value={data.primary_activity} name="primary_activity" onChange={handleInput} />

                    <div className="w-full flex flex-col flex-nowrap sm:flex-row divide-y divide-gray-200 sm:divide-y-0 sm:divide-x odd:bg-gray-100 first:rounded-t-md last:rounded-b-md">
                        <div className="p-2 pt-5 pl-4 w-full sm:w-5/12 h-auto sm:h-24">
                            <label className={`min-w-min text-sm ${focusProduct && 'font-semibold ml-2'} transition-all duration-300 transform-gpu`}>
                                Бүтээгдэхүүн үйлчилгээ:
                            </label>
                        </div>
                        <div className="py-3 px-4 flex-grow sm:w-7/12">
                            <div className="mb-2 flex flex-wrap items-center">
                                {
                                    data.ppsProducts.length ?
                                        data.ppsProducts.map((item, i) =>
                                            <div className="text-sm m-1 p-1 rounded-lg bg-gray-200 flex flex-nowrap items-center" key={item.productId}>
                                                <span className="ml-1">{products.filter(obj => obj.id === item.productId)[0] && products.filter(obj => obj.id === item.productId)[0].description_mon}</span>
                                                <button className="rounded-md text-red-500 focus:outline-none active:bg-red-200 active:text-red-600 ml-1" onClick={() => handleRemoveProduct(i)}>
                                                    <CloseSVG className="w-4 h-4" />
                                                </button>
                                            </div>) :
                                        <p className="p-1 text-xs italic opacity-80">Бүтээгдэхүүн сонгогдоогүй байна.</p>
                                }
                            </div>
                            <div className="w-full flex items-center px-2 border border-gray-300 rounded-md focus-within:border-blue-600 transition duration-300">
                                <SearchSVG className={`w-4 h-4 ${focusProduct ? 'text-blue-700' : 'text-gray-500'} transition-colors duration-300`} />
                                <input className="flex-grow mx-2 py-2 bg-transparent text-sm outline-none" type="text" value={searchProduct} onChange={e => setSearchProduct(e.target.value)} onFocus={handleFocusProduct} onBlur={handleBlurProduct} />
                                <button className={`rounded-md focus:outline-none ${focusProduct ? 'bg-gray-200 text-blue-600' : 'bg-green-500 text-white'} active:bg-green-600 p-1 flex items-center transition-all duration-300`} onClick={handleAddProduct}>
                                    <PlusSVG className="w-4 h-4" />
                                    <span className="text-sm mr-1">Нэмэх</span>
                                </button>
                            </div>
                            <div className={`my-2 text-sm rounded-md border border-r-0 border-gray-300 shadow-sm divide-y divide-dashed overflow-y-auto ${focusProduct ? 'visible opacity-100 h-60' : 'invisible opacity-0 h-0'} transition-all duration-300`}>
                                {
                                    products.filter(filterProduct).sort(compareProduct).length ?
                                        products.filter(filterProduct).sort(compareProduct).map((item, i) =>
                                            <div className='p-1 pl-2 hover:bg-blue-500 hover:text-gray-50' onMouseDown={() => setSearchProduct(item.description_mon)} key={item.id}>
                                                <span className="font-semibold pr-2">{i + 1}.</span>
                                                {item.description_mon}
                                            </div>) :
                                        <p className="p-1 text-xs text-center mt-4 italic opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg shadow-md min-w-min w-11/12 max-w-5xl mb-20 mx-auto">
                    <FormTextarea label="Төслийн талаар болон санхүүгийн дэмжлэгийг хэрхэн ашиглах талаар бичнэ үү:" placeholder="Төслийн танилцуулгыг бичнэ. Хэрэв та санхүүгийн дэмжлэг авбал юу хийх, ямар үр дүнд хүрэх талаар дэлгэрэнгүй тайлбарлана. Учир нь энэ хэсгээс таны төслийн талаар дэлгэрэнгүй мэдээллийг бид авах болно. Энэхүү тайлбар заавал их байх шаардлагагүй, гэхдээ та санхүүгийн дэмжлэг авсан тохиолдолд юу хийх вэ гэдэг тань тодорхой байх хэрэгтэй." value={data.project_intro} name="project_intro" onChange={handleInput} classAppend="bg-gray-100" rows="5" />

                    <FormTextarea label="Төслийг хэзээ эхлүүлэхээр төлөвлөж байна:" value={data.start_plan} name="start_plan" onChange={handleInput} />

                    <FormSmall label="Төслийн эхлэл хугацаа:" type="date" value={data.project_start} name="project_start" onChange={handleInput} />

                    <FormSmall label="Төслийн дуусах хугацаа:" type="date" value={data.project_end} name="project_end" onChange={handleInput} instruction="Төслийн нийт хугацааг харуулж чадах хугацааг бичнэ үү." />
                </div>
            </form>

            <button className="rounded-full self-end py-2 px-4 mr-12 inline-flex items-center font-medium text-white bg-blue-600 focus:outline-none active:bg-blue-700 hover:shadow-lg" onClick={navToProjectBudget}>
                Үргэлжлүүлэх
                <ArrowSVG className="w-5 h-5 ml-2 animate-pulse" />
            </button>
        </div >
    )
}

export default ProjectIntro

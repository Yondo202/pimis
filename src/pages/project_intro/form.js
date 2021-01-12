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
        <div className="tw-w-full tw-max-w-5xl tw-mx-auto tw-py-20 tw-flex tw-flex-col tw-text-gray-700">
            <h3 className="tw-text-xl tw-text-gray-600 tw-font-semibold tw-ml-4 tw-mb-8">
                2. Таны төсөл
            </h3>

            <form className="" onSubmit={handleSubmit}>
                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-border-t tw-bg-white">
                    <FormSmall label="Төслийн нэр:" type="text" value={data.project_name} name="project_name" onChange={handleInput} instruction="Төслийн нэр 10 үгнээс хэтрэхгүй. Нэр нь төслийн хүрээнд юу хийхийг тодорхойлсон байна." />

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-md last:tw-rounded-b-md">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-min-w-min tw-text-sm ${focusSector && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Салбар:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <div className="tw-w-full sm:tw-max-w tw-flex tw-items-center tw-px-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                <SearchSVG className={`tw-w-4 tw-h-4 ${focusSector ? 'tw-text-blue-700' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
                                <input className="tw-flex-grow tw-mx-2 tw-py-2 tw-bg-transparent tw-text-sm tw-outline-none" type="text" value={searchSector} onChange={e => setSearchSector(e.target.value)} onFocus={handleFocusSector} onBlur={handleBlurSector} />
                            </div>
                            <div className={`tw-my-2 tw-text-sm tw-rounded-md tw-border tw-border-r-0 tw-border-gray-300 tw-shadow-sm tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focusSector ? 'tw-visible tw-opacity-100 tw-h-60' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                                {
                                    businessSectors.filter(filterSector).sort(compareSector).length ?
                                        businessSectors.filter(filterSector).sort(compareSector).map((item, i) =>
                                            <div className="tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50" onMouseDown={() => handleSelectSector(item.id, item.bdescription_mon)} key={item.id}>
                                                <span className="tw-font-semibold tw-pr-2">{i + 1}.</span>
                                                {item.bdescription_mon}
                                            </div>) :
                                        <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>

                    <FormSmall label="Танай байгууллагын үндсэн үйл ажиллагаа:" type="text" value={data.primary_activity} name="primary_activity" onChange={handleInput} />

                    <div className="tw-w-full tw-flex tw-flex-col tw-flex-nowrap sm:tw-flex-row tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-divide-x odd:tw-bg-gray-100 first:tw-rounded-t-md last:tw-rounded-b-md">
                        <div className="tw-p-2 tw-pt-5 tw-pl-4 tw-w-full sm:tw-w-5/12 tw-h-auto sm:tw-h-24">
                            <label className={`tw-min-w-min tw-text-sm ${focusProduct && 'tw-font-semibold tw-ml-2'} tw-transition-all tw-duration-300 tw-transform-gpu`}>
                                Бүтээгдэхүүн үйлчилгээ:
                            </label>
                        </div>
                        <div className="tw-py-3 tw-px-4 tw-flex-grow sm:tw-w-7/12">
                            <div className="tw-mb-2 tw-flex tw-flex-wrap tw-items-center">
                                {
                                    data.ppsProducts.length ?
                                        data.ppsProducts.map((item, i) =>
                                            <div className="tw-text-sm tw-m-1 tw-p-1 tw-rounded-lg tw-bg-gray-200 tw-flex tw-flex-nowrap tw-items-center" key={item.productId}>
                                                <span className="tw-ml-1">{products.filter(obj => obj.id === item.productId)[0] && products.filter(obj => obj.id === item.productId)[0].description_mon}</span>
                                                <button className="tw-rounded-md tw-text-red-500 focus:tw-outline-none active:tw-bg-red-200 active:tw-text-red-600 tw-ml-1" onClick={() => handleRemoveProduct(i)}>
                                                    <CloseSVG className="tw-w-4 tw-h-4" />
                                                </button>
                                            </div>) :
                                        <p className="tw-p-1 tw-text-xs tw-italic tw-opacity-80">Бүтээгдэхүүн сонгогдоогүй байна.</p>
                                }
                            </div>
                            <div className="tw-w-full tw-flex tw-items-center tw-px-2 tw-border tw-border-gray-300 tw-rounded-md focus-within:tw-border-blue-600 tw-transition tw-duration-300">
                                <SearchSVG className={`tw-w-4 tw-h-4 ${focusProduct ? 'tw-text-blue-700' : 'tw-text-gray-500'} tw-transition-colors tw-duration-300`} />
                                <input className="tw-flex-grow tw-mx-2 tw-py-2 tw-bg-transparent tw-text-sm tw-outline-none" type="text" value={searchProduct} onChange={e => setSearchProduct(e.target.value)} onFocus={handleFocusProduct} onBlur={handleBlurProduct} />
                                <button className={`tw-rounded-md focus:tw-outline-none ${focusProduct ? 'tw-bg-gray-200 tw-text-blue-600' : 'tw-bg-green-500 tw-text-white'} active:tw-bg-green-600 tw-p-1 tw-flex tw-items-center tw-transition-all tw-duration-300`} onClick={handleAddProduct}>
                                    <PlusSVG className="tw-w-4 tw-h-4" />
                                    <span className="tw-text-sm tw-mr-1">Нэмэх</span>
                                </button>
                            </div>
                            <div className={`tw-my-2 tw-text-sm tw-rounded-md tw-border tw-border-r-0 tw-border-gray-300 tw-shadow-sm tw-divide-y tw-divide-dashed tw-overflow-y-auto ${focusProduct ? 'tw-visible tw-opacity-100 tw-h-60' : 'tw-invisible tw-opacity-0 tw-h-0'} tw-transition-all tw-duration-300`}>
                                {
                                    products.filter(filterProduct).sort(compareProduct).length ?
                                        products.filter(filterProduct).sort(compareProduct).map((item, i) =>
                                            <div className='tw-p-1 tw-pl-2 hover:tw-bg-blue-500 hover:tw-text-gray-50' onMouseDown={() => setSearchProduct(item.description_mon)} key={item.id}>
                                                <span className="tw-font-semibold tw-pr-2">{i + 1}.</span>
                                                {item.description_mon}
                                            </div>) :
                                        <p className="tw-p-1 tw-text-xs tw-text-center tw-mt-4 tw-italic tw-opacity-80">Хайлт олдсонгүй.</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-rounded-lg tw-shadow-md tw-min-w-min tw-w-11/12 tw-max-w-5xl tw-mb-20 tw-mx-auto tw-border-t tw-bg-white">
                    <FormTextarea label="Төслийн талаар болон санхүүгийн дэмжлэгийг хэрхэн ашиглах талаар бичнэ үү:" placeholder="Төслийн танилцуулгыг бичнэ. Хэрэв та санхүүгийн дэмжлэг авбал юу хийх, ямар үр дүнд хүрэх талаар дэлгэрэнгүй тайлбарлана. Учир нь энэ хэсгээс таны төслийн талаар дэлгэрэнгүй мэдээллийг бид авах болно. Энэхүү тайлбар заавал их байх шаардлагагүй, гэхдээ та санхүүгийн дэмжлэг авсан тохиолдолд юу хийх вэ гэдэг тань тодорхой байх хэрэгтэй." value={data.project_intro} name="project_intro" onChange={handleInput} classAppend="tw-bg-gray-100" rows="5" />

                    <FormTextarea label="Төслийг хэзээ эхлүүлэхээр төлөвлөж байна:" value={data.start_plan} name="start_plan" onChange={handleInput} />

                    <FormSmall label="Төслийн эхлэл хугацаа:" type="date" value={data.project_start} name="project_start" onChange={handleInput} />

                    <FormSmall label="Төслийн дуусах хугацаа:" type="date" value={data.project_end} name="project_end" onChange={handleInput} instruction="Төслийн нийт хугацааг харуулж чадах хугацааг бичнэ үү." />
                </div>
            </form>

            <button className="tw-rounded-full tw-self-end tw-py-2 tw-px-4 tw-mr-12 tw-inline-flex tw-items-center tw-font-medium tw-text-white tw-bg-blue-600 focus:tw-outline-none active:tw-bg-blue-700 hover:tw-shadow-lg" onClick={navToProjectBudget}>
                Үргэлжлүүлэх
                <ArrowSVG className="tw-w-5 tw-h-5 tw-ml-2 tw-animate-pulse" />
            </button>
        </div >
    )
}

export default ProjectIntro

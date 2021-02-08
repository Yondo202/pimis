import React, { useState } from 'react'
import FormRichText from 'components/urgudul_components/formRichText'


const rowDescriptions = {
    z: 'Өргөдөл гаргагчийн төслийг дэмжих саналтай эсэх?',
    a: 'A ХЭСЭГ: Өргөдөл гаргагч экспорт хийх чадавхитай эсэх?',
    a1: 'Шалгуур үзүүлэлтийг бүрэн хангасан эсэх (Шалгууруудыг хэрхэн хангасан талаарх мэдээлэл)',
    a2: 'Дотоодын зах зээл дээр байр сууриа олсон эсэх (Дотоодын зах зээл дээрх байр суурь, зорилтот зах зээлийн мэдээлэл)',
    a3: 'Одоогийн компанийн борлуулалт, ашигт гол нөлөө бүхий бүтээгдэхүүн, үйлчилгээ нь урт хугацааны өрсөлдөх чадвар бүхий бүтээгдэхүүн эсэх',
    a4: 'Санхүүгийн чадавхитай эсэх (Санхүүгийн үзүүлэлтүүд, ашигт ажиллагаа, санхүүгийн хүчин чадал)',
    a5: 'Чадавхи бүхий хүний нөөц, баг бүрдүүлж чадсан эсэх',
    a6: 'Экспорт хийсэн туршлагатай эсэх (Экспортын мэдээлэлд өгсөн дүн шинжилгээ)',
    a7: 'Төслийн санхүүжилт дууссаны дараа, экспортын зах зээлдээ үргэлжлүүлэн байр сууриа бататгах санхүүгийн чадавхи, хүсэлтэй эсэх',
    b: 'B ХЭСЭГ: Экспорт хөгжлийн төлөвлөгөө нь хэрэгжих боломжтой бөгөөд Монгол улсын экспортонд нөлөө үзүүлэх чадвартай эсэх?',
    b1: 'Зорилтот экспорт хийх улсад өрсөлдөх боломжтой эсэх (зах зээлийн багтаамж, зорилтот зах зээлийн хэмжээний талаарх мэдээлэл)',
    b2: 'Экспортын зорилтот зах зээлийн зорилтот хэрэглэгчдийн бүлэгт тохирсон бүтээгдэхүүн, үйлчилгээг нийлүүлэх боломжтой эсэх (хэрэглэгчдийн зан төлөв, сонирхлын талаар судалгаанд үндэслэсэн)',
    b3: 'Экспортын зорилтот зах зээлд өрсөлдөх чадвараа нэмэгдүүлэх төлөвлөгөө, хүчин чадалтай эсэх (өрсөлдөгчдийн судалгаанд үндэслэсэн шинжилгээ)',
    b4: 'Экспортын зах зээлд захиалгыг тасралтгүй ханган, үйлдвэрлэх боломжтой эсэх (үйлдвэрлэлийн төлөвлөгөөнд суурилсан шинжилгээ)',
    b5: 'Экспортын зах зээлд тохирсон чанарын удирдлагыг хангах боломжтой эсэх (тавигдаж буй чанарын удирдлагыг нэвтрүүлэх болон тасралтгүй хангах нөөц боломжийн талаарх шинжилгээ)',
    b6: 'Экспортын зах зээлд зориулсан өртгийн сүлжээг оновчтой удирдах боломжтой эсэх (өртгийн сүлжээний оролцогчдын шинжилгээ)',
    b7: 'Зах зээлд нэвтрэх оновчтой стратегитай эсэх',
    b8: 'Түгээлт, ханган нийлүүлэлтийг оновчтой төлөвлөсөн эсэх',
    b9: 'Төслийн өгөөж нь өргөдөл гаргагчид санхүүгийн өгөөжтэй эсэх (төслөөр бий болох санхүүгийн тооцооллын шинжилгээ)',
    b10: 'Төслөөс гарах үр дүн нь экспортын хэмжээ, экспортлогч улс, экспортлогчдын тоонд шууд нөлөөлөл үзүүлэх боломжтой эсэх (экспортын мэдээлэлтэй харьцуулсан шинжилгээ)',
    c: 'C ХЭСЭГ: Хэрэгжүүлэх арга хэмжээ нь урт хугацаанд өгөөж, давуу талыг бий болгож буй эсэх?',
    c1: 'Өргөдөл гаргагчийн төлөвлөсөн үйл ажиллагаа нь 9 сарын дотор хэрэгжих боломжтой эсэх',
    c2: 'Уг үйл ажиллагаа нь Экспорт хөгжлийн төлөвлөгөөтэй уялдаж, үр дүнтэй байх чадах эсэх',
}

const initialState = [
    {
        description: rowDescriptions.z,
        summary: '',
        isChecked: false,
        rowcode: 'z',
        order: 1,
        category: '@',
    },
    {
        description: rowDescriptions.a,
        summary: '',
        isChecked: false,
        rowcode: 'a',
        order: 5,
        category: 'A',
    },
    {
        description: rowDescriptions.a1,
        summary: '',
        isChecked: false,
        rowcode: 'a1',
        order: 10,
        category: 'A',
    },
    {
        description: rowDescriptions.a2,
        summary: '',
        isChecked: false,
        rowcode: 'a2',
        order: 15,
        category: 'A',
    },
    {
        description: rowDescriptions.a3,
        summary: '',
        isChecked: false,
        rowcode: 'a3',
        order: 20,
        category: 'A',
    },
    {
        description: rowDescriptions.a4,
        summary: '',
        isChecked: false,
        rowcode: 'a4',
        order: 25,
        category: 'A',
    },
    {
        description: rowDescriptions.a5,
        summary: '',
        isChecked: false,
        rowcode: 'a5',
        order: 30,
        category: 'A',
    },
    {
        description: rowDescriptions.a6,
        summary: '',
        isChecked: false,
        rowcode: 'a6',
        order: 35,
        category: 'A',
    },
    {
        description: rowDescriptions.a7,
        summary: '',
        isChecked: false,
        rowcode: 'a7',
        order: 40,
        category: 'A',
    },
    {
        description: rowDescriptions.b,
        summary: '',
        isChecked: false,
        rowcode: 'b',
        order: 45,
        category: 'B',
    },
    {
        description: rowDescriptions.b1,
        summary: '',
        isChecked: false,
        rowcode: 'b1',
        order: 50,
        category: 'B',
    },
    {
        description: rowDescriptions.b2,
        summary: '',
        isChecked: false,
        rowcode: 'b2',
        order: 55,
        category: 'B',
    },
    {
        description: rowDescriptions.b3,
        summary: '',
        isChecked: false,
        rowcode: 'b3',
        order: 60,
        category: 'B',
    },
    {
        description: rowDescriptions.b4,
        summary: '',
        isChecked: false,
        rowcode: 'b4',
        order: 65,
        category: 'B',
    },
    {
        description: rowDescriptions.b5,
        summary: '',
        isChecked: false,
        rowcode: 'b5',
        order: 70,
        category: 'B',
    },
    {
        description: rowDescriptions.b6,
        summary: '',
        isChecked: false,
        rowcode: 'b6',
        order: 75,
        category: 'B',
    },
    {
        description: rowDescriptions.b7,
        summary: '',
        isChecked: false,
        rowcode: 'b7',
        order: 80,
        category: 'B',
    },
    {
        description: rowDescriptions.b8,
        summary: '',
        isChecked: false,
        rowcode: 'b8',
        order: 85,
        category: 'B',
    },
    {
        description: rowDescriptions.b9,
        summary: '',
        isChecked: false,
        rowcode: 'b9',
        order: 90,
        category: 'B',
    },
    {
        description: rowDescriptions.b10,
        summary: '',
        isChecked: false,
        rowcode: 'b10',
        order: 95,
        category: 'B',
    },
    {
        description: rowDescriptions.c,
        summary: '',
        isChecked: false,
        rowcode: 'c',
        order: 100,
        category: 'C',
    },
    {
        description: rowDescriptions.c1,
        summary: '',
        isChecked: false,
        rowcode: 'c1',
        order: 105,
        category: 'C',
    },
    {
        description: rowDescriptions.c2,
        summary: '',
        isChecked: false,
        rowcode: 'c2',
        order: 110,
        category: 'C',
    },
]

export default function AnalystReport() {
    const [rows, setRows] = useState(initialState)

    const handleInput = (key, value, rowcode) => {
        const index = rows.findIndex(row => row.rowcode === rowcode)
        const newRows = rows
        newRows[index][key] = value
        setRows([...newRows])
    }

    return (
        <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-mt-8 tw-mb-20 tw-text-sm tw-text-gray-700 tw-bg-white tw-border tw-rounded-lg tw-shadow-md tw-p-2">
            <div className="tw-text-2xl tw-text-center tw-mt-4 tw-mb-6 tw-uppercase">
                Бизнес шинжээчийн шинжилгээний тайлан
            </div>

            <div className="">
                <label htmlFor="" className="">
                    Шинжилгээ хийсэн Бизнес шинжээч:
                </label>
                <input className="" type="text" name="" id="" />
            </div>

            <div className="">
                <label htmlFor="" className="">
                    Шинжилгээ, дүгнэлт хийсэн хугацаа:
                </label>
                <input className="" type="date" name="" id="" />
                <input className="" type="date" name="" id="" />
            </div>

            <div className="">
                <label htmlFor="" className="">
                    Байгууллагын нэр:
                </label>
            </div>

            <div className="">
                <label htmlFor="" className="">
                    Төслийн нэр:
                </label>
            </div>

            <div className="">
                <label htmlFor="" className="">
                    Өргөдлийн дугаар:
                </label>
            </div>

            <div className="">
                <label htmlFor="" className="">
                    Дэмжих, эсэх талаарх санал:
                </label>
                <input className="" type="checkbox" name="" id="" />
            </div>

            <div className="">
                <div className="">
                    Төслийг дэмжиж буй бол хэрэгжүүлэх явцад анхаарах зөвлөмж:
                </div>
                <FormRichText />
            </div>

            <div className="">
                <div className="">
                    Хэрэв төслийг дэмжихээс татгалзсан бол татгалзсан шалтгаан:
                </div>
                <FormRichText />
            </div>

            <table className="tw-border tw-rounded-sm tw-mt-6">
                <thead>
                    <tr>
                        <th className="tw-px-2 tw-pt-2">Үнэлгээний хороонд танилцуулах шинжээчийн дүгнэлт</th>
                        <th className="tw-px-2 tw-pt-2 tw-text-center">Товч утга</th>
                        <th className="tw-px-2 tw-pt-2 tw-text-center">Хариу</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        rows.map(((row, i) =>
                            <tr className={`${row.rowcode === 'a' || row.rowcode === 'b' || row.rowcode === 'c' ? 'tw-bg-gray-200' : ''}`} key={row.rowcode}>
                                <td className="tw-px-2">{row.description}</td>

                                <td>
                                    <textarea className="tw-bg-transparent tw-border tw-border-gray-400 focus:tw-outline-none tw-w-60" value={row.summary} onChange={e => handleInput('summary', e.target.value, row.rowcode)} />
                                </td>

                                <td>
                                    <div className="tw-flex tw-justify-center tw-items-center">
                                        <input className="tw-w-4 tw-h-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} onChange={e => handleInput('isChecked', e.target.checked, row.rowcode)} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className="tw-flex tw-items-center tw-justify-end tw-pt-6 tw-pb-4 tw-px-2">
                <button className="tw-bg-blue-500 tw-text-white tw-font-medium tw-text-base tw-px-3 tw-py-1 tw-rounded-lg hover:tw-shadow-md focus:tw-outline-none active:tw-bg-blue-600">
                    Хадгалах
                </button>
            </div>
        </div>
    )
}
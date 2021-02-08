import React, { useState } from 'react'


const rowDescriptions = {
    z: 'Өргөдөл гаргагч нь шалгаруулалтанд оролцох бүрэн бүрдүүлбэр, нотлох баримттай эсэх?',
    a: 'A ХЭСЭГ: Өргөдөл гаргагчийн шалгуур хангалт',
    a1: 'Хуулийн этгээдийн улсын бүртгэлийн гэрчилгээгээ илгээсэн эсэх',
    a2: 'Сүүлийн 2 жилийн санхүүгийн тайлангаа илгээсэн эсэх',
    a3: 'Санхүүгийн тайлангаар орлогын шалгуурыг хангаж байгаа эсэх',
    a4: 'Татвар, нийгмийн даатгалаас 12 сараас дээш хугацааны өргүйг нотолсон тодорхойлолт авч, илгээсэн эсэх',
    a5: 'Нийгмийн даатгалын тайлангаар шалгуур хангасан ажилтны тоотой эсэх',
    a6: 'Монголбанкны зээлийн мэдээллийн сангаас муу ангиллын зээлгүйг нотолсон тодорхойлолт авч, илгээсэн эсэх',
    a7: 'Хуулийн этгээдийн эцсийн өмчлөгч иргэдийг тодорхойлсон баримтуудыг бүрэн гүйцэд илгээсэн эсэх /иргэний үнэмлэхний мэдээлэл, эзэмшлийн хувь/',
    a8: 'Эцсийн өмчлөгчийн мэдээлэл нь шалгуур хангалтын зөрчилгүй эсэх',
    a9: 'Санхүүжилт бүрэн хийх боломжтойг нотолсон баримт бичиг',
    a10: 'Экспортын болон кластерын гэрээ хэлцэл, оюуны өмчийн эзэмшлийн нотолгоо, сургалт, зөвлөх үйлчилгээний хувьд сонгон шалгаруулах ажлын даалгавар, ажил гүйцэтгүүлэх байгууллага зөвлөхийн ур чадварыг илэрхийлэх баримт бичиг',
    a11: 'Өргөдөл гаргагч байгууллагын түлхүүр албан тушаалтнуудын ажлын туршлага, ур чадварыг илэрхийлэх намтар /3 албан тушаалтны CV/',
    a12: 'Байгаль орчны үнэлгээний асуумжийг нотлох баримт бичгүүд, байгаль орчны удирдлагын төлөвлөгөө',
    a13: 'Бусад шаардлагатай баримт бичиг /Эхний шалгаруулалтанд тэнцэхэд нэмэлтээр шаардсан бичиг баримтууд/',
    b: 'B ХЭСЭГ: Чанарын шаардлага хангасан Экспорт хөгжлийн төлөвлөгөө боловсруулж, зорилтуудаа тодорхой болгосон эсэх',
    b1: 'Экспортын зорилтот зах зээлүүдээ (орнуудаа) тодорхойлж, үнэлэн, сонголт хийсэн эсэх',
    b2: 'Зорилтот орон тус бүрт зорилтот сегментээ тодорхойлж, зах зээлийн хэмжээг оновчтой таамагласан эсэх',
    b3: 'Зорилтот сегмент бүрийнхээ хэрэглэгчийн зан төлөв, хэрэгцээ шаардлагыг судалсан эсэх',
    b4: 'Зорилтот сегмент бүрт өрсөлдөж буй өрсөлдөгчдөө бүтээгдэхүүн үйлчилгээний хамт өөртэйгөө харьцуулан, давуу тал, баримтлах стратегиа тодорхойлсон эсэх',
    b5: 'Зорилтот сегментдээ хүрэх нийлүүлэлтийн арга хэрэгслээ төлөвлөсөн эсэ',
    b6: 'Экспортыг зохицуулах хууль, эрхзүйн орчноо судалж, шаардагдах хийх ажил, зарцуулах хугацаа, зардалаа нарийвчилж төлөвлөсөн эсэх',
    b7: 'Борлуулалтын төлөвлөгөөгөө зорилтот зах зээл бүртээ боловсруулсан эсэх',
    b8: 'Бүтээгдэхүүн, үйлчилгээний чанарын стандартаа тодорхойлсон эсэх',
    b9: 'Зорилтот зах зээлд тохируулан бүтээгдэхүүнээ хөгжүүлэх төлөвлөгөөгөө тодорхойлсон эсэх',
    b10: 'Үйлдвэрлэлийн хүчин чадлаа нарийн төлөвлөсөн эсэх',
    b11: 'Бэлтгэн нийлүүлэлтийн сүлжээний удирдлагаа төлөвлөсөн эсэх',
    b12: 'Үнийн стратегиа тодорхойлсон эсэх',
    b13: 'Зах зээлд нэвтрэх стратегиа тодорхойлсон эсэх',
    b14: 'Идэвхижүүлэлтийн стратегиа тодорхойлсон эсэх',
}

const initialState = [
    {
        description: rowDescriptions.z,
        isChecked: false,
        comment: '',
        rowcode: 'z',
        order: 1,
        category: '@',
    },
    {
        description: rowDescriptions.a,
        isChecked: false,
        comment: '',
        rowcode: 'a',
        order: 5,
        category: 'A',
    },
    {
        description: rowDescriptions.a1,
        isChecked: false,
        comment: '',
        rowcode: 'a1',
        order: 10,
        category: 'A',
    },
    {
        description: rowDescriptions.a2,
        isChecked: false,
        comment: '',
        rowcode: 'a2',
        order: 15,
        category: 'A',
    },
    {
        description: rowDescriptions.a3,
        isChecked: false,
        comment: '',
        rowcode: 'a3',
        order: 20,
        category: 'A',
    },
    {
        description: rowDescriptions.a4,
        isChecked: false,
        comment: '',
        rowcode: 'a4',
        order: 25,
        category: 'A',
    },
    {
        description: rowDescriptions.a5,
        isChecked: false,
        comment: '',
        rowcode: 'a5',
        order: 30,
        category: 'A',
    },
    {
        description: rowDescriptions.a6,
        isChecked: false,
        comment: '',
        rowcode: 'a6',
        order: 35,
        category: 'A',
    },
    {
        description: rowDescriptions.a7,
        isChecked: false,
        comment: '',
        rowcode: 'a7',
        order: 40,
        category: 'A',
    },
    {
        description: rowDescriptions.a8,
        isChecked: false,
        comment: '',
        rowcode: 'a8',
        order: 45,
        category: 'A',
    },
    {
        description: rowDescriptions.a9,
        isChecked: false,
        comment: '',
        rowcode: 'a9',
        order: 50,
        category: 'A',
    },
    {
        description: rowDescriptions.a10,
        isChecked: false,
        comment: '',
        rowcode: 'a10',
        order: 55,
        category: 'A',
    },
    {
        description: rowDescriptions.a11,
        isChecked: false,
        comment: '',
        rowcode: 'a11',
        order: 60,
        category: 'A',
    },
    {
        description: rowDescriptions.a12,
        isChecked: false,
        comment: '',
        rowcode: 'a12',
        order: 65,
        category: 'A',
    },
    {
        description: rowDescriptions.a13,
        isChecked: false,
        comment: '',
        rowcode: 'a13',
        order: 70,
        category: 'A',
    },
    {
        description: rowDescriptions.b,
        isChecked: false,
        comment: '',
        rowcode: 'b',
        order: 75,
        category: 'B',
    },
    {
        description: rowDescriptions.b1,
        isChecked: false,
        comment: '',
        rowcode: 'b1',
        order: 80,
        category: 'B',
    },
    {
        description: rowDescriptions.b2,
        isChecked: false,
        comment: '',
        rowcode: 'b2',
        order: 85,
        category: 'B',
    },
    {
        description: rowDescriptions.b3,
        isChecked: false,
        comment: '',
        rowcode: 'b3',
        order: 90,
        category: 'B',
    },
    {
        description: rowDescriptions.b4,
        isChecked: false,
        comment: '',
        rowcode: 'b4',
        order: 95,
        category: 'B',
    },
    {
        description: rowDescriptions.b5,
        isChecked: false,
        comment: '',
        rowcode: 'b5',
        order: 100,
        category: 'B',
    },
    {
        description: rowDescriptions.b6,
        isChecked: false,
        comment: '',
        rowcode: 'b6',
        order: 105,
        category: 'B',
    },
    {
        description: rowDescriptions.b7,
        isChecked: false,
        comment: '',
        rowcode: 'b7',
        order: 110,
        category: 'B',
    },
    {
        description: rowDescriptions.b8,
        isChecked: false,
        comment: '',
        rowcode: 'b8',
        order: 115,
        category: 'B',
    },
    {
        description: rowDescriptions.b9,
        isChecked: false,
        comment: '',
        rowcode: 'b9',
        order: 120,
        category: 'B',
    },
    {
        description: rowDescriptions.b10,
        isChecked: false,
        comment: '',
        rowcode: 'b10',
        order: 125,
        category: 'B',
    },
    {
        description: rowDescriptions.b11,
        isChecked: false,
        comment: '',
        rowcode: 'b11',
        order: 130,
        category: 'B',
    },
    {
        description: rowDescriptions.b12,
        isChecked: false,
        comment: '',
        rowcode: 'b12',
        order: 135,
        category: 'B',
    },
    {
        description: rowDescriptions.b13,
        isChecked: false,
        comment: '',
        rowcode: 'b13',
        order: 140,
        category: 'B',
    },
    {
        description: rowDescriptions.b14,
        isChecked: false,
        comment: '',
        rowcode: 'b14',
        order: 145,
        category: 'B',
    },
]

export default function CompilationChecklist() {
    const [rows, setRows] = useState(initialState)

    const handleInput = (key, value, rowcode) => {
        rows.findIndex(row => row.rowcode === rowcode)
        const newRows = rows
    }

    return (
        <div className="tw-w-11/12 tw-max-w-5xl tw-mx-auto tw-mt-8 tw-mb-20 tw-text-sm tw-text-gray-700 tw-bg-white tw-border tw-rounded-lg tw-shadow-md tw-p-2">
            <div className="tw-text-2xl tw-text-center tw-mt-4">
                Бүрдүүлбэрийн нотлох баримтыг шалгах хуудас
            </div>

            <table className="tw-border tw-rounded-sm tw-mt-2">
                <thead>
                    <tr>
                        <th className="tw-px-2 tw-pt-2">Сүүлийн шатны баримт шалгах хуудас</th>
                        <th className="tw-px-2 tw-pt-2 tw-text-center">Хариу</th>
                        <th className="tw-px-2 tw-pt-2 tw-text-center">Тайлбар</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        rows.map(((row, i) =>
                            <tr className={`${row.rowcode === 'a' || row.rowcode === 'b' || row.rowcode === 'c' ? 'tw-bg-gray-200' : ''}`}>
                                <td className="tw-px-2">{row.description}</td>

                                <td>
                                    <div className="tw-flex tw-justify-center tw-items-center">
                                        <input className="tw-w-4 tw-h-4 tw-flex-shrink-0" type="checkbox" checked={row.isChecked} onChange={e => handleInput('isChecked', e.target.checked, row.rowcode)} />
                                    </div>
                                </td>

                                <td>
                                    <textarea className="tw-bg-transparent tw-border tw-border-gray-400 focus:tw-outline-none tw-w-60" value={row.comment} onChange={e => handleInput('comment', e.target.value, row.rowcode)} />
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
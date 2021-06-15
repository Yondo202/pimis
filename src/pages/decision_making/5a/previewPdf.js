import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'


Font.register({
    family: "Roboto", fonts:
        [
            { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" },
            { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf" },
        ]
})

const styles = StyleSheet.create({
    page: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        fontFamily: "Roboto",
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
        fontWeight: 500,
    },
    info: {
        textAlign: 'right',
        fontSize: 10,
        marginTop: 4,
        marginHorizontal: 4,
    },
    infoBold: {
        fontWeight: 500,
    },
    row: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        fontSize: 11,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    column1: {
        width: 474,
        padding: '4 4 4 16',
        borderRightWidth: 1,
    },
    column2: {
        width: 80,
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4 0',
    },
    column2Text: {
        width: '100%',
        textAlign: 'center',
    },
    headRow: {
        border: '1px solid black',
        backgroundColor: '#1E3A8A',
        color: 'white',
    },
    commentText: {
        textAlign: 'right',
        padding: '4 12 4 24',
        color: '#374151',
    },
})

export default function FirstEvaluationPreviewPdf(props) {
    const rows = props.rows || []
    const company = props.company || {}

    return (
        <Document>
            <Page style={styles.page} wrap>
                <Text style={styles.title}>
                    Анхан шатны үнэлгээний хуудас
                </Text>

                <View style={styles.info}>
                    <Text>
                        {'Дугаар: '}
                        <Text style={styles.infoBold}>{company.project?.project_number}</Text>
                    </Text>
                    <Text>
                        {'Төрөл: '}
                        <Text style={styles.infoBold}>{company.project?.project_type_name}</Text>
                    </Text>
                    <Text>
                        {'Байгууллагын нэр: '}
                        <Text style={styles.infoBold}>{company.companyname}</Text>
                    </Text>
                    <Text>
                        {'Төслийн нэр: '}
                        <Text style={styles.infoBold}>{company.project?.project_name}</Text>
                    </Text>
                </View>

                {rows.map(row => ({
                    'z':
                        <View key={row.rowcode} style={{ marginTop: 8 }} wrap={false}>
                            <View style={[styles.row, styles.headRow]}>
                                <View style={[styles.column1, { paddingLeft: 6, paddingVertical: 6 }]}>
                                    <Text>
                                        {row.description}
                                    </Text>
                                </View>

                                <View style={styles.column2}>
                                    <Text style={styles.column2Text}>
                                        {row.isChecked ? 'Тэнцсэн' : 'Тэнцээгүй'}
                                    </Text>
                                </View>
                            </View>

                            {row.comment ?
                                <View style={styles.row}>
                                    <Text style={styles.commentText}>
                                        ({row.comment})
                                    </Text>
                                </View>
                                :
                                null
                            }
                        </View>,
                }[row.rowcode] ||
                    <View key={row.rowcode} wrap={false}>
                        <View style={styles.row}>
                            <View style={[styles.column1, ['a', 'b', 'c'].includes(row.rowcode) && { paddingLeft: 6 }]}>
                                <Text>
                                    {row.description}
                                </Text>
                            </View>

                            <View style={styles.column2}>
                                <Text style={styles.column2Text}>
                                    {row.isChecked ? 'Тийм' : 'Үгүй'}
                                </Text>
                            </View>
                        </View>

                        {row.comment ?
                            <View style={styles.row}>
                                <Text style={styles.commentText}>
                                    ({row.comment})
                                </Text>
                            </View>
                            :
                            null
                        }
                    </View>
                ))}
            </Page>
        </Document>
    )
}
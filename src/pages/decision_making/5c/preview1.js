import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { Fragment } from 'react'


Font.register({
    family: "Roboto", fonts:
        [
            { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" },
            { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf" },
        ]
})

const styles = StyleSheet.create({
    page: {
        padding: '30px 20px',
        fontFamily: "Roboto",
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
    },
    infoView: {
        fontSize: 11,
        marginTop: 20,
    },
    infoText: {
        margin: '4 0',
    },
    rowsView: {
        marginTop: 6,
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
        width: 450,
        padding: '4 4 4 16',
        borderRightWidth: 1,
    },
    column2: {
        width: 100,
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

export default function AnalystReportPreview1(props) {
    const rows = props.rows || []
    const info = props.info || {}
    const project = props.project || {}

    const isCheckedZ = rows.filter(row => row.rowcode === 'z')[0]?.isChecked

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>
                    Бизнес шинжээчийн тайлан
                </Text>

                <View style={styles.infoView}>
                    <Text style={styles.infoText}>
                        Шинжилгээ хийсэн Бизнес шинжээч: {'Zultsetseg'}
                    </Text>

                    <Text style={styles.infoText}>
                        Шинжилгээ, дүгнэлт хийсэн хугацаа:
                        {info.check_start?.replaceAll('-', '.') || '__'}
                        -аас
                        {info.check_end?.replaceAll('-', '.') || '__'}
                        -ны хооронд.
                    </Text>

                    <Text style={styles.infoText}>
                        Байгууллагын нэр: {project.company_name}
                    </Text>

                    <Text style={styles.infoText}>
                        Төслийн нэр: {project.project_name}
                    </Text>

                    <Text style={styles.infoText}>
                        Өргөдлийн дугаар: {project.id}
                    </Text>

                    <Text style={styles.infoText}>
                        {isCheckedZ ? 'Төслийг хэрэгжүүлэх явцад анхаарах зөвлөмж:' : 'Төслийг дэмжихээс татгалзсан шалтгаан:'}
                    </Text>

                    <Text style={styles.infoText}>
                        {info.decline_reason}
                    </Text>
                </View>

                <View style={styles.rowsView}>
                    {rows.map(row => ({
                        'z': <View key={row.rowcode}>
                            <View style={[styles.row, styles.headRow, { fontWeight: 500 }]}>
                                <View style={[styles.column1, { paddingLeft: 6 }]}>
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
                    }[row.rowcode] || <View key={row.rowcode}>
                            <View style={styles.row}>
                                <View style={[styles.column1, ['a', 'b', 'c'].includes(row.rowcode) && { paddingLeft: 6 }]}>
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
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    )
}
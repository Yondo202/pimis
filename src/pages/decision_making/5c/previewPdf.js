import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'


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
    analystView: {
        fontSize: 11,
        marginTop: 4,
    },
    analystText: {
        margin: '4 0',
    },
    analystImage: {
        width: 554,
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

export default function AnalystReportPreviewPdf(props) {
    const rows = props.rows || []
    const info = props.info || {}
    const company = props.company || {}
    const analyst = props.analyst || {}
    const htmlImg = props.htmlImg

    const isCheckedZ = rows.filter(row => row.rowcode === 'z')[0]?.isChecked

    return (
        <Document>
            <Page style={styles.page} wrap>
                <Text style={styles.title}>
                    ???????????????????????? ????????????
                </Text>

                <View style={styles.info}>
                    <Text>
                        {'????????????: '}
                        <Text style={styles.infoBold}>{company.project?.project_number}</Text>
                    </Text>
                    <Text>
                        {'??????????: '}
                        <Text style={styles.infoBold}>{company.project?.project_type_name}</Text>
                    </Text>
                    <Text>
                        {'???????????????????????? ??????: '}
                        <Text style={styles.infoBold}>{company.companyname}</Text>
                    </Text>
                    <Text>
                        {'?????????????? ??????: '}
                        <Text style={styles.infoBold}>{company.project?.project_name}</Text>
                    </Text>
                </View>

                <View style={styles.analystView}>
                    <Text style={styles.analystText}>
                        {'?????????????????? ???????????? ???????????? ??????????????: '}
                        <Text style={styles.infoBold}>
                            {info.analyst_name}
                        </Text>
                    </Text>

                    <Text style={styles.analystText}>
                        {'??????????????????, ?????????????? ???????????? ??????????????: '}
                        <Text style={styles.infoBold}>{info.check_start?.replaceAll('-', '.') || '__'}</Text>
                        {' -?????? '}
                        <Text style={styles.infoBold}>{info.check_end?.replaceAll('-', '.') || '__'}</Text>
                        {' -???? ??????????????.'}
                    </Text>

                    <Text style={styles.analystText}>
                        {isCheckedZ ? '?????????????? ?????????????????????? ?????????? ???????????????? ??????????????:' : '?????????????? ?????????????????? ???????????????????? ????????????????:'}
                    </Text>

                    <Image style={styles.analystImage} src={htmlImg} />
                </View>

                {rows.map(row => ({
                    'z':
                        <View key={row.rowcode} style={{ marginTop: 12 }} wrap={false}>
                            <View style={[styles.row, styles.headRow]}>
                                <View style={[styles.column1, { paddingLeft: 6, paddingVertical: 6 }]}>
                                    <Text>
                                        {row.description}
                                    </Text>
                                </View>

                                <View style={styles.column2}>
                                    <Text style={styles.column2Text}>
                                        {row.isChecked ? '??????????????' : '??????????????????'}
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
                                    {row.isChecked ? '????????' : '????????'}
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

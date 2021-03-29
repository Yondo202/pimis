import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'


export default function AnalystReportPreview1(props) {
    const rows = props.rows || []
    const info = props.info || {}
    const project = props.project || {}

    return (
        <Document>
            <Page>
                <Text style={styles.title}>
                    Бизнес шинжээчийн шинжилгээний тайлан
                </Text>

                <View>
                    <Text>
                        Өргөдөл гаргагчийн төслийг дэмжих саналтай эсэх?
                    </Text>
                    <Text>
                        {true ? 'Тэнцсэн' : 'Тэнцээгүй'}
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
    },
})
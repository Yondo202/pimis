
import React from 'react'
import useQuery from 'components/utilities/useQueryLocation'
import Approved from 'components/admin/contents/notifyPage/Approve/Approved'
import NotApproved from 'components/admin/contents/notifyPage/notApprove/NotApproved'
import { useParams } from 'react-router'


export default function FirstEvaluationSendNotice() {
    const projectId = useParams().id
    const qualified = useQuery().get('qualified')

    return qualified
        ? <Approved projectId={projectId} />
        : <NotApproved projectId={projectId} />
}
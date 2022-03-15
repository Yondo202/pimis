import React, { useEffect, useContext, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserContext from "./context/UserContext";
import { AlertStore } from "components/utilities/alertContext";
import AlertDialog from "components/alert_dialog/alertDialog";
import { FilePreviewStore } from "components/utilities/filePreviewContext";
import FilePreviewModal from "components/file_preview/filePreview";
import 'devextreme/dist/css/dx.common.css'
// import 'devextreme/dist/css/dx.light-compact.css'
import 'assets/devExtremeTheme/dx.material.blue-light-compact.css'

const MemberRoute = lazy(() => import('containers/member/MemberRoute'))
const TrainerPanel = lazy(() => import('containers/trainer/TrainerPanel'))
const Admin = lazy(() => import('containers/admin/MainMenu'))
const UsersRoute = lazy(() => import('containers/users/UsersRoute'))
const UnAuthContent = lazy(() => import('UnauthContent'))

function App() {
  const [userId, setUserId] = useState(null);
  const ctxUser = useContext(UserContext);

  useEffect(() => {
    setUserId(ctxUser.userInfo.id);
    const token = localStorage.getItem("accessToken");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    if (token) {
      if (expireDate > new Date()) {
        // Hugatsaa n duusaaagui token baina, automat login hiine
        ctxUser.autoRenewTokenAfterMillisec(expireDate.getTime() - new Date().getTime());
      } else {
        //Хугацаа дууссан байсанч токен байвал логин хийнэ
        // Token - oo refresh hiij daraagiin refresh hiih hugatsaag tohiruulna
        ctxUser.autoRenewTokenAfterMillisec(3600000);
      }
    }
  }, [userId]);

  return (
    <div className="App">
      <AlertStore>
        <FilePreviewStore>
          <Router>
            <Suspense fallback={<></>}>
              {ctxUser.userInfo.userId
                ? ctxUser.userInfo.role !== "user"
                  ? {
                    'member': <MemberRoute />,
                    'trainer': <TrainerPanel />,
                  }[ctxUser.userInfo.role] || <Admin />
                  : (<UsersRoute />)
                : (<UnAuthContent />)
              }
            </Suspense>
          </Router>
          <FilePreviewModal />
        </FilePreviewStore>
        <AlertDialog />
      </AlertStore>
    </div>
  );
}

export default App;

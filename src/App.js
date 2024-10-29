import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { AdminPrivateRouter, AdminPublicRouter } from './route/AdminRouter';
import { createContext, Suspense, useEffect, } from 'react';
import { Row, Spin, Col } from 'antd';
import { useSelector } from 'react-redux';
import Layouts from '../src/page/layout/Layouts'

export default function App() {
  const value = useSelector(x => x.isLoggedIn)

  return (
    <>
      {value ?
        <Layouts />
        :
        <Routes>
          {value.isLoggedIn ?
            AdminPrivateRouter.map((value, index) => {
              let Component = value.component;
              return (
                <Route
                  key={`value-${index}`}
                  path={value.path}
                  element={
                    <Suspense
                      fallback={
                        <Row
                          justify="center"
                          style={{ lineHeight: "697px" }}
                        >
                          <Col>
                            <Spin size="large" />
                          </Col>
                        </Row>
                      }
                    >
                      <Component />
                    </Suspense>
                  }
                />
              )
            }) : AdminPublicRouter.map((value, index) => {
              let Component = value.component;
              return (
                <Route
                  key={`value-${index}`}
                  path={value.path}
                  element={
                    <Suspense
                      fallback={
                        <Row
                          justify="center"
                          style={{ lineHeight: "697px" }}
                        >
                          <Col>
                            <Spin size="large" />
                          </Col>
                        </Row>
                      }
                    >
                      <Component />
                    </Suspense>
                  }
                />
              )
            })}
        </Routes>
      }

    </>
  );

}


import React from 'react'
import { Row } from 'antd';
import img from '../../assets/error-404-line-icons-cloud-saving-personal-data-security-road-sign-found-internet-web-design-concept-vector-line-icon-white-background_661108-3791.jpg'
export default function NotFound() {
    return (
        <div>
            <Row justify={'center'}>
                <img src={img} height='500vh' alt="nothing" />
            </Row>
        </div>
    )
}

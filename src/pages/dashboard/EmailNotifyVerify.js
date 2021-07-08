import React from 'react'
import { Card } from 'react-bootstrap';
import { NavigasiTop } from './navigasi-component/NavigasiTop';
import './email-verify-notify.css'

export const EmailNotifyVerify = () => {
  return (
    <>
      <NavigasiTop />
      <div id="main">
        <Card className="email-notify-verify">
          <Card.Body className="text-center text-email-notify-verify">
            Mohon Verifikasi Email Terlebih Dahulu!
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import './Footer.css';


const Footer = () => {

  return (
    <MDBFooter color="#c62828 red darken-3" className="font-small pt-4 mt-4" id="body-footer">
      <MDBContainer >
        <MDBRow>
          <MDBCol md="4">
            <center>

              <MDBIcon icon="at" style={{ fontSize: 30 }} />
              <div style={{ marginTop: 20 }}>sarenonesosis@gmail.com</div>
            </center>
          </MDBCol>
          <MDBCol md="4">
            <center>
              <MDBIcon icon="home" style={{ fontSize: 30 }} />
              <div style={{ marginTop: 20 }}>Jl. Caringin Gg. Komplek Pasadena No. 60B <br /> RT02/RW03  Kec/Kel. Babakan Ciparay 40223 <br />Bandung, Jawa Barat, Indonesia</div>
            </center>
          </MDBCol>
          <MDBCol md="4">
            <center>
              <MDBIcon icon="phone" style={{ fontSize: 30 }} />
              <div style={{ marginTop: 20 }}>022 - 54119654</div><div style={{ marginBottom: 50 }}> 0851 - 56371589</div>
            </center>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; CV. HEAVEN SENTOSA {new Date().getFullYear()}
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
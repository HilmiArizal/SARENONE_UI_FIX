import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import './Footer.css';


const Footer = () => {

  return (
    <MDBFooter color="#c62828 red darken-3" className="font-small pt-4 mt-4" id="body-footer">
      <MDBContainer >
        <MDBRow>
          <MDBCol md="4">
            <div className="section-footer">
              <MDBIcon icon="at" style={{ fontSize: 30 }} />
              <div className="item-footer">sarenonesosis@gmail.com</div>
            </div>
          </MDBCol>
          <MDBCol md="4">
            <div className="section-footer">
              <MDBIcon icon="home" style={{ fontSize: 30 }} />
              <div className="item-footer" >Jl. Caringin Gg. Komplek Pasadena No. 60B <br /> RT02/RW03  Kec/Kel. Babakan Ciparay 40223 <br />Bandung, Jawa Barat, Indonesia</div>
            </div>
          </MDBCol>
          <MDBCol md="4">
            <div className="section-footer">
              <MDBIcon icon="phone" style={{ fontSize: 30 }} />
              <div className="item-footer" >022 - 54119654<div> 0851 - 56371589</div> </div>
            </div>
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
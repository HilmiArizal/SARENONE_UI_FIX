import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import './AboutHome.css';
import FoodCharacter from '../../Images/CharacterFood.png';
import CompanyProfile from '../../Images/CompanyProfileHilmi.pdf';
import CompanyProfileImg from '../../Images/CompanyProfile.png';


class AboutHome extends Component {

    render() {
        return (
            <div id="section3">
                <MDBContainer>
                    <div className="card-about-home">
                        <div className="sub-section-about">
                            <div className="title-about-home">TENTANG KAMI</div>
                            <MDBContainer>
                                <div className="section-about">
                                    <div className="section-left-about">
                                        <img src={FoodCharacter} className="image-Character" alt="characterHome" />
                                    </div>
                                    <div className="section-right-about">
                                        <h1 style={{ fontSize: 25 }}>CV. Heaven Sentosa</h1>
                                        <p style={{ fontSize: 14 }}>
                                            Kami merupakan perusahaan yang bergerak di bidang Perdagangan dan Supplier Daging Olahan (Frozen Food). Perusahaan ini telah berdiri sejak tahun 2017 tanggal 13 Maret di kota Bandung.
                                    </p>
                                        <h3 style={{ fontSize: 17 }}>Visi kami:</h3>
                                        <p style={{ fontSize: 10 }}>
                                            Menjadi salah satu perusahaan yang dipercaya melayani kebutuhan hotel dan resto di Indonesia.
                                    </p>
                                        <h3 style={{ fontSize: 17 }}>Misi kami:</h3>
                                        <p style={{ fontSize: 10 }}>
                                            Memberikan pelayanan yang terbaik dan saling menguntungkan bagi konsumen produk dan perusahaan serta menciptakan kerjasama yang professional di bidangnya.
                                    </p>
                                        <h3 style={{ fontSize: 17 }}>Motto kami:</h3>
                                        <p style={{ fontSize: 10 }}>
                                            Kepuasan konsumen, Kebanggaan bagi kami.
                                    </p>
                                    </div>
                                </div>
                            </MDBContainer>
                            <center>
                                <div style={{ marginTop: 50 }}>
                                    <img src={CompanyProfileImg} alt="W3Schools" width="150" height="200" className="img-CP" />
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <a href={CompanyProfile} download="Company Profile SarenOne" id="a-about">
                                        <div className="about-download">Download</div>
                                </a>
                                </div>
                            </center>
                        </div>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default AboutHome;
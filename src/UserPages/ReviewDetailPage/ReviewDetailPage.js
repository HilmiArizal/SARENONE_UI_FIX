import React, { Component } from 'react';
import './ReviewDetailPage.css';
import { getReviewDetail, addReviewDetail, deleteReviewDetail } from '../../Redux/Actions';
import { connect } from 'react-redux';
import $ from 'jquery';
import { MDBIcon } from 'mdbreact';


class ReviewDetail extends Component {

    state = {
        changeReviewText: ''
    }

    componentDidMount() {
        // let idproduct = this.props.idproduct
        this.getReviewDetail();
    }

    getReviewDetail = () => {
        let idproduct = this.props.idproduct.idproduct;
        // console.log(idproduct)
        this.props.getReviewDetail(idproduct)
    }

    openReview = () => {
        this.setState({ closeReview: true })
    }

    onAddReview = (idproduct) => {
        let productId = idproduct;
        let userId = this.props.iduser;
        let detailreview = this.state.changeReviewText;
        let dataReview = { productId, userId, detailreview }
        this.props.addReviewDetail(dataReview)
        $("#myForm")[0].reset();
    }

    onDeleteReview = (idreview,idproduct) => {
        this.props.deleteReviewDetail(idreview, idproduct)
    }

    renderGetReviewDetail = () => {
        return this.props.dataReview.map((item) => {
            return (
                <div>
                    <div className="results-review">
                        <label><div>{item.username.toUpperCase()}</div> <div className="icon-x-review">{this.props.iduser === item.iduser ? <MDBIcon icon="times" id="icon-trash" onClick={() => this.onDeleteReview(item.idreview, item.idproduct)}/> : ''}</div></label>
                        <i>{item.detailreview}</i>
                    </div>
                </div>
            )
        })
    }

    render() {
        const { idproduct } = this.props.idproduct;
        return (
            <div className="body-review-detail">
                <div className="section-review-detail">
                    <div className="card-review-detail">
                        <div className="title-review-product">Review Produk {this.props.productname}</div>
                        <div>
                            {
                                this.props.dataReview.length === 0
                                    ?
                                    <div style={{ marginTop: '2%' }}>Belum ada review</div>
                                    :
                                    this.renderGetReviewDetail()
                            }
                            <form id="myForm">
                                <div className="input-group" style={{ marginTop: '2%' }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                            <i className="fas fa-pencil-alt prefix"></i>
                                        </span>
                                    </div>
                                    <textarea placeholder="Tambahkan review" className="form-control" rows="5" onChange={(e) => this.setState({ changeReviewText: e.target.value })}></textarea>
                                </div>
                            </form>
                            <div className="btn-review-detail" onClick={() => this.onAddReview(idproduct)}>SUBMIT</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = ({ user, wishlist }) => {
    return {
        iduser: user.iduser,
        dataReview: wishlist.dataReview
    }
}

export default connect(mapStatetoProps, { getReviewDetail, addReviewDetail, deleteReviewDetail })(ReviewDetail);
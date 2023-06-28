import React,{ Component }from "react";
import Slider from "react-slick";
import {Link } from "react-router-dom";
import "./detail.css";
import StarRatings from "react-star-ratings";
import Cart from "../header/Cart";
import { cart, comment, deletecomment, getalldetail, getallproduct, getcart, getcomment } from "../servide/service";
import CommonUtils from "../ultil/CommonUtils";
import {  toast } from 'react-toastify';
const moment = require('moment');





export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
        nav2: null,
      current: 1,
      rating: 5,
      feedback: true,
      checkcart: false,
      data: [],
      oneproduct: [],
      product_id:"",
      custumer_id:"",
      productname:"",
      price:"",
      quancity:"",
      image: "",
      name: "",
      description: "",
      imagecomment: "",
      raitingcomment: 0,
      allcomment:[]
      
      
    };
  }

 getproduct = async() => {
   let product = await getallproduct({ type: this.props.id });
   
  
   if (product && product.data.data) {
    
     let comment = await getcomment({id:product.data.data[0].id})
     this.setState({
       allcomment:comment.data.data,
       oneproduct:product.data.data
     })
   }
         
    }
  async componentDidMount() {
    this.getproduct()
    
    
    
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  
   
   
   
    
  }
  addproduct(id) {
    if (this.state.current === 0) {
      this.setState({ current: 1 })
    } else{
      if (id === 1) {
        this.setState({ current: this.state.current + 1 })
      } else {
        this.setState({ current: this.state.current - 1 })
      }
  }
  }
  changeRating = (newRating) => {
    this.setState({raitingcomment:newRating})
  };
  opencart = async () => {
   
    let res = await cart({
        product_id: this.state.oneproduct&& this.state.oneproduct[0].id?this.state.oneproduct[0].id:"",
        custumer_id: this.props.data.userData.id,
        productname: this.state.oneproduct&& this.state.oneproduct[0].productname?this.state.oneproduct[0].productname:"",
        price:this.state.oneproduct&& this.state.oneproduct[0].price?this.state.oneproduct[0].price:"",
        quancity: this.state.current,
        image:this.state.oneproduct&& this.state.oneproduct[0].image?this.state.oneproduct[0].image:"",
    })
    if (res) {
     toast.success("Bạn đã thêm vào giỏ hàng thành công")
    } else {
      toast.error("Bạn đã thêm vào giỏ hàng thất bại")
   }
    this.props.update()
   
    this.setState({ checkcart: !this.state.checkcart })
  }
  closecart = () => {
    this.setState({ checkcart: !this.state.checkcart})
  }
  click = (id) => {
    if (id === 1) {
      this.setState({feedback:true})
    } else {
      this.setState({feedback:false})
    }
  }

    handlechangeimage = async (e) => {
        let files = e.target.files;
        
        let file = files[0];
        
        if (file) {
          this.setState({
             imagecomment:await CommonUtils.getBase64(file)
           })
            
           
        }
    }

  handleclick = async () => {
    
    let res = await comment({
      name:this.state.name,
     description: this.state.description,
      custumer_id: this.props.data.userData.id,
        product_id: this.state.oneproduct[0].id,
       raiting: this.state.raitingcomment,
      image: this.state.imagecomment,
       now: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    if (res) {
      let comment = await getcomment({id:this.state.oneproduct[0].id})
      this.setState({
        name: "",
        description: "",
        raiting: 0,
        imagecomment: "",
        allcomment:comment.data.data
      })
       toast.success("Bạn đã thêm đánh giá thành công")
    } else {
       toast.error("Bạn đã thêm đánh giá thất bại")
    }
    

    
  }
  handledeletecomment =async (id) => {
    let res = await deletecomment({ id: id });
    if (res) {
      let comment = await getcomment({ id: this.state.oneproduct[0].id })
      this.setState({
        allcomment:comment.data.data
      })
     toast.success("Bạn đã xóa đánh giá thành công")
    } else {
       toast.error("Bạn đã xóa đánh giá thất bại")
    }
  }
  render() {
    let data = this.props.detail;
    let product = this.state.oneproduct
    let datauser = this.props.data;
    let comment = this.state.allcomment;
    
    
    
   
    return (
      <div className="container-detail">
        <div className="detail-slider">
            <div className="detail-slider-item">
                 <Slider
          asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}
                    className="slider-item-detail1"
            >
              {data && data.length && data.map(item => {
                 return <div key={item.id}>
                    <div className="itemdetail1">
                        <img src={item.image}  alt="" />
           </div>
          </div>
              })}
          
          
          
        </Slider>
         <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={4}
          swipeToSlide={true}
                    focusOnSelect={true}
                    className="slider-item-detail2"
                    
        >
          {data && data.length && data.map(item => {
                 return <div key={item.id}>
                    <div className="itemdetail">
                        <img src={item.image} width="89px" height="89px" alt="" />
           </div>
          </div>
              })}
        </Slider>
       

            </div>

            <div className="detail-slider-add">
            <h2>{product && product[0]?product[0].productname :''}</h2>
                 <div className="product-price">
              <span className='sale'>{product && product[0]?product[0].price:'' }<sup>đ</sup> </span><span style={{margin:"0 10px 0 0"}}>-</span>
              <span className='curren-price' style={{ fontSize: "20px" }}>{product && product[0]?product[0].price:'' }<sup>đ</sup> </span>
          </div>
            <hr style={{ margin: "15px 0" }} />
           
            {/* <p style={{ width: "350px", lineHeight: "2", color: "#333333" }}  dangerouslySetInnerHTML={{__html:product && product[0]? product[0].productdes :''}}></p> */}
          <div className="detail-slider-add-number-flex">
            
                <div className="detail-slider-add-number">
                    <div className="detail-slider-add-number-item">
                        <div className="detail-number">
                            <p>{this.state.current }</p>

                        </div>
                        <div className="detail-slider-add-number-items">
                            <button><i onClick={()=>this.addproduct(1)} className="fa-solid fa-plus"></i></button><br></br>
                            <button><i onClick={()=>this.addproduct(2)} className="fa-solid fa-minus"></i></button>
                        </div>
                   </div>
               </div>
              <div className="detail-slider-add-item">
                { datauser.check===true ? <button onClick={this.opencart}>THÊM VÀO GIỎ HÀNG</button> :
                  <Link to="/user/creat">
                    <button onClick={this.closecart}>THÊM VÀO GIỎ HÀNG</button>
                  </Link>
                }
                  </div>
          </div>
          <div className="detail-compare">
            <div className="detail-compare-witlist">
              <i className="fa-regular fa-heart"></i>
              <span>ADD TO WISHLIST</span>
            </div>
            <div className="detail-compare-witlist">
              <i className="fa-solid fa-signal"></i>
              <span>COMPARE</span>
            </div>
          </div>
          <hr style={{ margin: "15px 0" }} />
          <div className="detail-category">
            <div className="detail-category-item">
              <span>CATEGORIES:</span><span> Đồng Hồ Cơ, Hublot</span>
            </div>
            <div className="detail-category-item">
              <span>TAG:</span><span> Đồng Hồ Đeo Tay Hublot</span>
            </div>
          </div>
            </div>
       
       
      </div>
        <div className="detail-description">
          <div className="detail-description-item">
            <div className="detail-description-item-title">
              <p onClick={()=>this.click(1)} style={this.state.feedback?{color:"orange" ,borderBottom:"1px solid orange"}:{}}>MÔ TẢ</p>
              <p onClick={()=>this.click(2)} style={!this.state.feedback?{color:"orange" ,borderBottom:"1px solid orange"}:{}} >ĐÁNH GIÁ </p>
            </div>
            <hr />
            {this.state.feedback ?
              <div className="detail-description-item-content">
                <p>Máy chạy cơ automatic hàng Nhật <br></br>

                  Mặt size x 38/42 mm<br></br>

                  Khung kim loại thép 316L đúc đặc chống bay màu rỉ sét<br></br>

                  Mặt kính Crystal chống xước<br></br>

                  Dây da dập vân lót cao su polieste cao cấp chống bó nóng khi ra mồ hôi<br></br>

                  Chịu nước tuyệt đối : 5 ATM</p>
              </div>
              :
              <div className="detail-description-item-feedback">
                  
                <div className="detail-description-item-feedback-item">
                  <h3>
                    Be the first to review “{product[0].productname }”

                  </h3>
                  <div className="detail-description-item-feedback-item-value">
                    <input type="text" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} /><br></br>
                    <label >NAME*</label>

                  </div>
                  <div className="detail-description-item-feedback-item-value">
                   
                                    <div className="prev-img">
                      <input id='previmage' onChange={this.handlechangeimage} type="file" hidden />
                      <div className="upload-label-item" >

                                        <label className='upload-label' htmlFor="previmage">Add Image <i className="fa-solid fa-cloud-arrow-up"></i></label>
                                        
                      </div>

                    </div>
                     <label >IMAGE*</label>

                  </div>
                  <div className="detail-description-item-feedback-item-check">
                    <input type="checkbox" />
                    <label >Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần bình luận kế tiếp của tôi.</label>

                  </div>
                  <div className="detail-description-item-feedback-item-star">
                    <p>Your Rating</p>
                    <StarRatings
                      rating={this.state.raitingcomment}
                      starRatedColor="blue"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      starDimension="15px"
                      starSpacing="5px"
                      name="rating"
                    />
                  </div>
                  <textarea name="" value={this.state.description} onChange={(e)=>this.setState({description:e.target.value})} className="detail-description-item-feedback-item-des" cols="30" rows="10"></textarea><br></br>
                  {datauser.check === true ? <button onClick={this.handleclick} className="detail-description-item-feedback-item-submit">SUBMIT REVIEW</button> :<Link to="/user/creat"><button className="detail-description-item-feedback-item-submit">SUBMIT REVIEW</button></Link>}
                  {comment[0] ? <div className="comment-product">
                    <h2>Đánh Giá</h2>
                    <hr />
                    {comment && comment.length && comment.map(item => {
                      return <div key={item.id} className="profile-comment">
                      
                        <img className="comment-image1" src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-dai-dien-nguoi-giau-mat-doc-dao-cho-facebook.jpg" alt="" />
                        <div className="profile-comment-item">
                          <p>{item.name}</p>
                          <StarRatings
                            rating={item.raiting}
                            starRatedColor="blue"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            starDimension="8px"
                            starSpacing="2px"
                            name="rating"
                          /><br></br>
                          <span>{item.description} </span>
                          <div className="comment-image">
                            {item.image ?<img src={item.image} alt="" />:""}<br></br>
                            <span>{item.now}</span>
                            {datauser.check===true ?datauser.userData.id===item.custumer_id?<span onClick={()=>this.handledeletecomment(item.id)}>Xóa </span>:"":""}
                           
                          </div>
                        </div>
                      </div>
                    })}
                    
                  </div> : ""}
                </div>
               
              </div>
            

              }
          </div>
        </div>
        <Cart check={this.state.checkcart} data={this.props.cart}  toggle={this.closecart } />
      </div>
    );
  }
}
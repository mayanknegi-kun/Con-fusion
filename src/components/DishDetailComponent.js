import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    BreadcrumbItem,
    Breadcrumb,
    Button,
    Modal,ModalBody,ModalHeader, Row,Col,Label
  } from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform,Fade,Stagger} from "react-animation-components";

  //validation for name
  const required =(val)=>val && val.length;
  const maxLength = (len) => (val)=> !val || val.length<=len;
  const minLength = (len) =>(val)=>!val || val.length>=len;
  //end of validation

  //comment-form modal
  class CommentForm extends Component{

    constructor(props){
        super(props)
        
        this.state={
            isModalOpen:false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        })
    }

    handleComment(values){
       this.toggleModal();
       this.props.postComment(this.props.dishId,values.rating,values.name,values.comment);
    }


      render(){
          return  <>
                <Button outline color="secondary" onClick={this.toggleModal} className="mb-5"><i className="fa fa-pencil fa-lg"></i>{' '}<span className="fa fa-pen fa-lg"></span> Submit Comment</Button>
               
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleComment(values)}>
                            <Row className="from-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating"
                                    id="rating" 
                                    name="rating" 
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="from-group">
                                <Label htmlFor="name" md={2}>Your Name</Label>
                                <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, maxLength: maxLength(15),minLength:minLength(3)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            maxLength: 'Must be 15 characters or less',
                                            minLength: 'Must be 3 characters or more'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="from-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" 
                                    id="comment" 
                                    name="comment" 
                                    row="6"
                                    className="form-control" />
                                </Col>
                            </Row >
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" value="submit" color="primary" className="mt-4">Submit</Button>
                                </Col>    
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                </>
      }
  }
  

  const RenderDish = ({dish,isLoading,errMess})=>{
      if(isLoading){
          return(
              <div className="container">
                  <div className="row">
                      <Loading/>
                  </div>
              </div>
          )
      }
      else if(errMess!=null){
        return(
            <div className="container">
                <div className="row">
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
      }
    else if (dish != null) {
        return(
        <div className="col-12 col-md-5">
            <FadeTransform in 
                transformProps={{
                    exitTransform:'scale(0.5) translateY(-50%)'
                }}>
        <Card className="mb-3">
            <CardImg top width="100%" src={baseUrl+dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle><strong>{dish.name}</strong></CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
        </div>
        )
    } else {
        return <div></div>
    }
  }

  const RenderComments = ({comments,postComment,dishId})=>{
    if(comments.length>0){
        return<div className="col-12 col-md-5">
            <header><h4>Comments</h4></header>
            <ul className="list-unstyled">
            <Stagger in>
            {comments.map((comment)=>{
                return  <Fade in>
                <li>{comment.comment}</li>
                <li>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </Fade>
            })}
            </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    }
    else{
        return <div className="col-12 col-md-5">
                    <CommentForm/>
                </div>
    }
    
  }
 
  
const DishDetail =({dish,comments,postComment,isLoading,errMess})=>{
    return(
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    {/* breaks because of delay in getting dish value coz of setTimeout */}
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
               <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr/>
                </div> 
            </div>
            <div className="row">
            <RenderDish dish={dish} isLoading={isLoading} errMess={errMess} />
            <RenderComments comments={comments} dishId={dish.id} postComment={postComment}/>
            </div>
        </div>
    )
}  


export default DishDetail;

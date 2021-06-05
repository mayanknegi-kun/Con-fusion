import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';


  function RenderDish(dish){
    if (dish != null) {
        return <div className="row">
        <div className="col-12 col-md-5">
        <Card>
            <CardImg top width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle><strong>{dish.name}</strong></CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
        <div className="col-12 col-md-5">
            {RenderComments(dish.comments)}
        </div>
        </div>
    } else {
        return <div></div>
    }
  }

  function RenderComments(comments){
    if(comments.length>0){
        return<div>
            <header><h4>Comments</h4></header>
            <ul className="list-unstyled">
            {comments.map((comment)=>{
                return  <>
                <li>{comment.comment}</li>
                <li>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </>
            })}
            </ul>
        </div>
    }
    else{
        return // no comments for this
    }
  }
 
  
const DishDetail =({dish})=>{
    return(
        <div className="container">
            {RenderDish(dish)}
        </div>
    )
}  


export default DishDetail;

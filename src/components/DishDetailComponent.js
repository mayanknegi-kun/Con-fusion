import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    BreadcrumbItem,
    Breadcrumb
  } from 'reactstrap';

import {Link} from 'react-router-dom';


  function RenderDish(dish){
    if (dish != null) {
        return(
        <div className="col-12 col-md-5">
        <Card>
            <CardImg top width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
            <CardTitle><strong>{dish.name}</strong></CardTitle>
            <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
        )
    } else {
        return <div></div>
    }
  }

  function RenderComments(comments){
    if(comments.length>0){
        return<div className="col-12 col-md-5">
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
 
  
const DishDetail =({dish,comments})=>{
    return(
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
               <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr/>
                </div> 
            </div>
            <div className="row">
            {RenderDish(dish)}
            {RenderComments(comments)}
            </div>
        </div>
    )
}  


export default DishDetail;

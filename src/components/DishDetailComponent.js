import React, { Component } from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';


class DishDetail extends Component {   

    render() {

        const dish = this.props.dish

       function renderComments(comments){
            if(comments.length>0){
                return<div>
                    <header><h4>Comments</h4></header>
                    <ul className="list-unstyled">
                    {comments.map((comment)=>{
                        return  <>
                        <li>{comment.comment}</li>
                        <li>--{comment.author}, {comment.date.slice(0,10)}</li>
                        </>
                    })}
                    </ul>
                </div>
            }
            else{
                return // no comments for this
            }
        }

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
                {renderComments(dish.comments)}
            </div>
            </div>
        } else {
            return <div></div>
        }
    }
}

export default DishDetail;

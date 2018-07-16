import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'

const Dashboard  = ({ posts, auth, handlePostDelete }) => {
    if(!auth){
        return (
        <div className="card-panel hoverable">
            <h4>Hello There!</h4>
                <br />
            <h4>Please login to add a new post.</h4>
        </div>
        );
    }
    else {
        const postItems = posts.map((post, index) => {
            return (
                <div className="col s12 m6 hoverable" key={index}>
                    <div className="small card blue lighten-1">
                        <div className="card-content white-text">
                        <span className="card-title">{post.title}</span>
                        <p>{post.description}</p>
                        </div>
                        <div className="card-action">
                            <a href={"/edit-post/" + post._id}  className="white-text"><i className="small material-icons">edit</i></a>
                            <a onClick={handlePostDelete.bind(false,post._id)} className="red-text cursor-pointer"><i className="small material-icons">delete</i></a>
                        </div>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <div className="row">
                    {postItems}
                </div>
                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large blue hoverable" href="/add-post">
                        <i className="large material-icons">add</i>
                    </a>
                </div>
            </div>
        );
    }    
}

export default Dashboard;
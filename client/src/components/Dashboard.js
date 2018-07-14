import React from 'react';

const Dashboard  = ({ posts }) => {
    console.log(posts);
    if(posts.length < 1){
        return <div></div>
    }
    else {
        const postItems = posts.map((post, index) => {
            return (<div className="post-preview" key={index}><h4>{post.title}</h4><p>{post.description}</p></div>);
        });
        return (
            <div className="display-flex">
                {postItems}
                <div className="add-post-btn">+</div>
            </div>
        );
    }    
}

export default Dashboard;
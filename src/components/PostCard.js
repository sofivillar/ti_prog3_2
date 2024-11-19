import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export class PostCard extends Component {

    constructor() {
        super();
        this.state = {
            post: this.props.post
        }
    }

    handleDeletePost = (postId) => {
        db.collection("posts").doc(postId).delete()
            .then(() => {
                console.log("Se elimino la publicacion");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <Text>Post</Text>
        )
    }
}

export default PostCard

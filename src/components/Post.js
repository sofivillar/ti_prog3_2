import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {db, auth} from "../firebase/config";
import AntDesign from '@expo/vector-icons/AntDesign';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        }
    }

    handleDeletePost = (postId) => { // hasta que no creemos post no se puede probar
        db.collection("posts").doc(postId).delete()
            .then(() => {
                console.log("Se elimino la publicacion");
                if (this.props.onDelete) {
                    this.props.onDelete(postId) // para que cambie tambien en profile no solo el console.log
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleLike = () => {

    }

    handleDislike = () => {

    }

    render() {
        const {post} = this.state;
        const createdAt = new Date(post.data.createdAt).toLocaleDateString();

        return (
            <View style={styles.container}>
                <Text>Post</Text>
                <Text>Usuario: {post.userName} </Text>
                <Text>Likes: {post.likes} </Text>
                <Button title="Like" onPress={() => this.handleLike(post.id)} />
                <Button title="Dislike" onPress={() => this.handleDislike(post.id)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Post

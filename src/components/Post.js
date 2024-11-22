import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from "../firebase/config";
// import AntDesign from '@expo/vector-icons/AntDesign';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.post
        }
    }

    handleDeletePost = () => {
        const { post } = this.state

        db.collection("posts").doc(post.id).delete()
            .then(() => {
                console.log("Se elimino la publicacion");
                if (this.props.onDelete) {
                    this.props.onDelete(post.id) // para que cambie tambien en profile no solo el console.log
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
        const { post } = this.state;
        const createdAt = new Date(post.createdAt).toLocaleDateString();

        return (
            <View style={styles.container}>
                <Text>Post</Text>
                <Text>Usuario: {post.usernName} </Text>
                <Text>Likes: {post.likes} </Text>
                <Text>Creado el: {createdAt} </Text>
                <Button title="Like" onPress={() => this.handleLike(post.id)} />
                <Button title="Dislike" onPress={() => this.handleDislike(post.id)} />

                <TouchableOpacity onPress={this.handleDeletePost()}>
                    <Text>Eliminar publicacion</Text>
                </TouchableOpacity>
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

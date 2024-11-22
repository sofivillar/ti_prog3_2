import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from "../firebase/config";
// import AntDesign from '@expo/vector-icons/AntDesign';

export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: this.props.posts
        }
    }

    handleDeletePost = () => {
        const { posts } = this.state

        db.collection("posts").doc(posts.id).delete()
            .then(() => {
                console.log("Se elimino la publicacion");
                if (this.props.onDelete) {
                    this.props.onDelete(posts.id) // para que cambie tambien en profile no solo el console.log
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
        const { posts } = this.state;
        const createdAt = new Date(posts.createdAt).toLocaleDateString();

        return (
            <View style={styles.container}>
                <Text>Post</Text>
                <Text>{posts.data.description}</Text>
                <Text>Usuario: {posts.data.owner} </Text>
                <Text>Likes: {posts.data.likes} </Text>
                <Text>Creado el: {createdAt} </Text>
                <Button title="Like" onPress={() => this.handleLike(posts.id)} />
                <Button title="Dislike" onPress={() => this.handleDislike(posts.id)} />

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

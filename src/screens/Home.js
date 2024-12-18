import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-web';
import Post from '../components/Post';
import { auth, db } from "../firebase/config";

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: "user",
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate('Login');
            }
        });
        this.handlePosts()
    }

    handlePosts = () => {
        db.collection('posts').orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    posts: posts,
                    loading: false
                })
            }),
            (error) => {
                console.error(error);
            }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Home</Text>
                <FlatList style={styles.flatlist} data={this.state.posts} keyExtractor={(item) => item.id} renderItem={({ item }) => <Post posts={item} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: "lightpink",
        padding: 10,
        borderRadius: 15,
        width: '30%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#222',
        fontSize: 13,
        fontWeight: 'bold',
    },
    flatlist: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    },
    botones: {
        flexDirection: 'column',
        marginBottom: 30,
        width: '100%',
        alignItems: 'center',
    }
});
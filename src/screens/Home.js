import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
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
                {auth.currentUser ? (<FlatList style={styles.flatlist} data={this.state.posts} keyExtractor={(item) => item.id} renderItem={({ item }) => <Post posts={item} />} />
                ) : (<View style={styles.botones}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Ir a Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.buttonText}>Ir a Register</Text>
                    </TouchableOpacity>
                </View>)}
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    button: {
        backgroundColor: "lightpink",
        padding: 10,
        borderRadius: 5,
        width: '18%',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#222',
        fontSize: 12,
        fontWeight: 'bold',
    },
    flatlist: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    },
    botones: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
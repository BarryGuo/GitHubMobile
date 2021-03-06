/**
 *
 *
 * @flow
 */
'use strict';

import React, {Component} from 'react'
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Alert,
} from 'react-native'
import GlobalStyles from '../../res/styles/GlobalStyles'
import HTMLView from 'react-native-htmlview'
import WebViewPage from '../page/WebViewPage'


export default class RespositoryCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.projectModel.isFavorite, //是否收藏
            //收藏的图标
            favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
        };
    }

    //当组件收到新的props时调用，初始化render时不执行，在这个回调函数里面，可以选择和当前的props进行比较,根据属性的变化，通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用
    componentWillReceiveProps(nextProps) {//当从当前页面切换走，再切换回来后
        this.setFavoriteState(nextProps.projectModel.isFavorite)
    }

    //改变选中状态
    setFavoriteState(isFavorite) {
        this.props.projectModel.isFavorite = isFavorite;
        this.setState({
            isFavorite: isFavorite,
            favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png')
        })
    }

    //收藏按钮点击事件
    onPressFavorite() {
        this.setFavoriteState(!this.state.isFavorite)  
        //传递点击事件
        this.props.onFavorite(this.props.projectModel.item, !this.state.isFavorite)
    }

    render() {
        let item = this.props.projectModel.item? this.props.projectModel.item:this.props.projectModel;
        let TouchableElement = TouchableHighlight;

        //收藏按钮
        let favoriteButton=this.props.projectModel.item?
            <TouchableHighlight
                style={{padding:6}}
                onPress={()=>this.onPressFavorite()} underlayColor='transparent'>  
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22,},this.props.theme.styles.tabBarSelectedIcon]}
                    source={this.state.favoriteIcon}/>
            </TouchableHighlight>:null;

        let description='<p>'+item.description+'</p>';
        return (
            <TouchableElement
                onPress={this.props.onSelect}
                onShowUnderlay={this.props.onHighlight}
                underlayColor='transparent'
                onHideUnderlay={this.props.onUnhighlight}>

                
                <View style={GlobalStyles.cell_container}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.title}>
                            {item.full_name}
                        </Text>

                    </View>
                    {/*<Text style={styles.description}>*/}
                    {/*{item.description}*/}
                    {/*</Text>*/}



                    <HTMLView
                        value={description}
                        onLinkPress={(url) => {
                            this.props.navigator.push({
                                component: WebViewPage,
                                params: {
                                    title:url,
                                    url:url,
                                    ...this.props
                                },
                            });
                        }}
                        stylesheet={{
                            p:styles.description,
                            a:styles.description,
                        }}
                    />


                    <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.author}>Author: </Text>
                            <Image
                                style={{width: 22, height: 22,}}
                                source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.author}>Stars: </Text>
                            <Text style={styles.author}>
                                {item.stargazers_count}
                            </Text>
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            

            </TouchableElement>
        );
    }
}


var styles = StyleSheet.create({
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
        flex:1
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    author: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
});







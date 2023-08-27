import React, { useCallback, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'react-native-tiny-toast'

import * as articleActions from '@store/articleList';

import ArticleItem from '@articleItem';


const ArticleList = ({ articleList, actions, navigation: { navigate } }) => {

    useEffect(() => {
        Toast.showLoading('Loading...')
        actions.getArticlesListFromStore()
        setTimeout(() => {
            Toast.hide()
        }, 2000);
    }, [])

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <ArticleItem navigate={navigate} isList={true} index={index} item={item} />
            )
        }, [articleList])

    const onEndReached = useCallback(() => {
        actions.getArticlesListFromStore(articleList.length)
    }, [])

    return (
        <FlashList
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            estimatedItemSize={200}
            data={articleList}
        />
    );
}

const mapStateToProps = state => ({
    articleList: state?.articleStore?.articleList,
});

const ActionCreators = Object.assign(
    {},
    articleActions,
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
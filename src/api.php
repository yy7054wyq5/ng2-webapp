<?php
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group(['namespace' => 'Api'], function () {
    Route::post('/index/index', 'IndexController@anyIndex');
    Route::post('/index/hotproducts', 'IndexController@anyHotproducts');

    Route::get('/app/info/{id}', 'AppController@anyInfo');

    Route::post('/account/captcha', 'AccountController@anyCaptcha');
    Route::post('/account/register', 'AccountController@anyRegister');
    Route::post('/account/login', 'AccountController@anyLogin');
    Route::post('/account/userinfo', 'AccountController@anyUserinfo');
    Route::post('/account/backpwd', 'AccountController@anyBackpwd');
    Route::post('/account/modifypwd', 'AccountController@anyModifypwd');
    Route::post('/account/unregisteredmobile', 'AccountController@anyUnregisteredmobile');
    Route::post('/account/unregisteredNickname', 'AccountController@anyUnregisteredNickname');
    Route::post('/account/registeredMobile', 'AccountController@anyRegisteredMobile');
    Route::put('/account/update', 'AccountController@postUpdate');
    Route::post('/account/ranks', 'AccountController@anyRanks');
    Route::post('/account/creditrecord', 'AccountController@anyCreditrecord');
    Route::get('/account/address/{id}', 'AccountController@anyAddress');
    Route::post('/account/addaddress', 'AccountController@anyAddaddress');
    Route::delete('/account/deleteaddress', 'AccountController@anyDeleteaddress');
    Route::post('/account/advise', 'AccountController@anyAdvise');
    Route::post('/account/createadvice', 'AccountController@anyCreateadvice');
    Route::post('/account/messagegather', 'AccountController@anyMessagegather');
    Route::post('/account/messages', 'AccountController@anyMessages');
    Route::delete('/account/deletemessage', 'AccountController@anyDeletemessage');
    Route::post('/account/share', 'AccountController@anyShare');
    Route::post('/account/users', 'AccountController@anyUsers');
    Route::post('/account/deduct', 'AccountController@anyDeduct');

    Route::post('/product/category', 'ProductController@anyCategory');
    Route::post('/product/childcategory', 'ProductController@anyChildcategory');
    Route::get('/product/list', 'ProductController@anyList');
    Route::post('/product/detail/{id}', 'ProductController@anyDetail');
    Route::post('/product/promotion/{id}', 'ProductController@anyPromotion');
    Route::post('/product/promotionproduct/{id}', 'ProductController@anyPromotionproduct');
    Route::post('/product/credit', 'ProductController@anyCredit');
    Route::post('/product/comment', 'ProductController@anyComment');

    Route::post('/article/category', 'ArticleController@anyCategory');
    Route::post('/article/childcategory', 'ArticleController@anyChildcategory');
    Route::get('/article/list', 'ArticleController@anyList');
    Route::post('/article/detail/{id}', 'ArticleController@anyDetail');
    Route::post('/article/comments', 'ArticleController@anyComments');
    Route::post('/article/publishcomment', 'ArticleController@anyPublishcomment');

    Route::get('/comment/list', 'CommentController@anyListanyList');
    Route::post('/comment/publish', 'CommentController@anyPublish');
    Route::post('/comment/mine', 'CommentController@anyMine');

    Route::post('/forum/create', 'ForumController@anyCreate');
    Route::get('/forum/list', 'ForumController@anyList');
    Route::post('/forum/topics', 'ForumController@anyTopics');
    Route::post('/forum/topicdetail/{id}', 'ForumController@anyTopicdetail');
    Route::post('/forum/thumbtopic', 'ForumController@anyThumbtopic');

    Route::get('/branch/list', 'BranchController@anyList');
    Route::post('/branch/detail/{id}', 'BranchController@anyDetail');
    Route::post('/branch/guide/{id}', 'BranchController@anyGuide');
    Route::post('/branch/setguide', 'BranchController@anySetguide');
    Route::post('/branch/guideinfo', 'BranchController@anyGuideinfo');

    Route::post('/cart/set', 'ShoppingCartController@anySet');
    Route::delete('/cart/delete', 'ShoppingCartController@anyDelete');
    Route::get('/cart/list', 'ShoppingCartController@anyList');

    Route::get('/public/city', 'PublicController@anyCity');
    Route::get('/public/area', 'PublicController@anyArea');
    Route::get('/public/roletag', 'PublicController@anyRoletag');
    Route::post('/public/provincecityareaitems', 'PublicController@anyProvincecityareaitems');
    Route::post('/public/about/{id}', 'PublicController@anyAbout');
    Route::post('/public/shippingfee', 'PublicController@anyShippingfee');
    Route::post('/public/problems', 'PublicController@anyProblems');
    Route::post('/public/error', 'PublicController@anyError');
    Route::put('/public/updateapp', 'PublicController@anyUpdateapp');

    Route::post('/order/confirm', 'OrderController@anyConfirm');
    Route::post('/order/create', 'OrderController@anyCreate');
    Route::get('/order/list', 'OrderController@anyList');
    Route::post('/order/detail/{id}', 'OrderController@anyDetail');
    Route::post('/order/alipaynotice', 'OrderController@anyAlipaynotice');
    Route::post('/order/yuedannotice', 'OrderController@anyYuedannotice');
    Route::post('/order/wxnotice', 'OrderController@anyWxnotice');
    Route::post('/order/pay', 'OrderController@anyPay');
    Route::put('/order/updatestate', 'OrderController@anyUpdatestate');
    Route::post('/order/state/{id}', 'OrderController@anyState');
    Route::post('/order/comment', 'OrderController@anyComment');
    Route::delete('/order/delete', 'OrderController@anyDelete');

    Route::post('/weixin/valid', 'WeixinController@getValid');
    Route::post('/weixin/openid', 'WeixinController@getOpenid');
    Route::post('/weixin/responseMsg', 'WeixinController@responseMsg');
    Route::post('/weixin/checkSignature', 'WeixinController@checkSignature');
});

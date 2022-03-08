<?php

Route::get('/', function () {
    return view('welcome');
});
Auth::routes();
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');

// Auth::routes([
//  
// ]);

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['middleware' => ['auth']], function () {
    //ログインしていないと見れないページ
    Route::get('/mypage', 'MypageController@index');
    Route::get('/mypage-news', 'MypageController@news');
    Route::get('/mypage-question', 'MypageController@question')->name('question');
    Route::get('/mypage-log', 'MypageController@log');
    Route::get('/mypage-setup', 'MypageController@setup');
    Route::get('student-meeting', 'StudentMeetingController@index');
    Route::get('teacher-meeting', 'TeacherMeetingController@index');
    Route::resource('postquestion', 'RestQuestionController');
    Route::resource('putanswer', 'RestAnswerController');
    Route::resource('rest', 'RestMeetingController');
    Route::resource('postnews', 'RestNewsController');
    Route::resource('postjoinlog', 'RestJoinLogController');
});

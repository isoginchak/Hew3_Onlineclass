<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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
});

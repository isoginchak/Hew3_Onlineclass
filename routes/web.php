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
Route::get('student-meeting', 'StudentMeetingController@index');
Route::get('teacher-meeting', 'TeacherMeetingController@index');
Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');

Route::resource('rest','RestMeetingController');
Route::resource('postquestion', 'RestQuestionController');

// Auth::routes([
//  
// ]);
Route::get('/mypage', 'MypageController@index');
Route::get('/home', 'HomeController@index')->name('home');

Route::post('/hello/add', 'HelloController@add');

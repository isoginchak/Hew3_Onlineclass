<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MypageController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $id =   Auth::id();

        $classes = DB::table('users')
            ->join('participation', 'users.id', '=', 'participation.user_id')
            ->join('classes', 'participation.class_id', '=', 'classes.id')
            ->where('participation.user_id', $id)
            ->get();
        return view('mypage.mypage-timetable', ['user' => $user], ['classes' => $classes]);
    }
    public function news()
    {
        return view('mypage.mypage-news');
    }
    public function question()
    {
        $user = Auth::user();
        $id =   Auth::id();

       
        $questions = DB::table('questions')
        ->join('participation', 'questions.class_id', '=', 'participation.class_id')
        ->leftjoin('users', 'questions.user_id', '=', 'users.id')
        ->leftjoin('classes', 'questions.class_id', '=', 'classes.id')
        ->where('participation.user_id', $id)
        ->select('questions.id as question_id','classes.class_name','users.family_name','users.first_name','question','solve','answer')
        ->get();

        return view('mypage.mypage-question',['questions' => $questions]);
    }
    public function log()
    {
        return view('mypage.mypage-log');
    }
    public function setup()
    {
        return view('mypage.mypage-setup');
    }
}

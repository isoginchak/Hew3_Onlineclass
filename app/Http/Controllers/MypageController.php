<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\NewsRestData;

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
        $user = Auth::user();
        $id =   Auth::id();

        $newses = NewsRestData::join('participation', 'newses.address_class_id', '=', 'participation.class_id')
            ->leftjoin('users', 'newses.user_id', '=', 'users.id')
            ->leftjoin('classes', 'newses.address_class_id', '=', 'classes.id')
            ->where('participation.user_id', $id)
            ->select('newses.id as newses_id', 'classes.class_name', 'news_title', 'news_content', 'newses.created_at as created_at')
            ->latest()
            ->get();

        $news_classes = DB::table('users')
            ->join('participation', 'users.id', '=', 'participation.user_id')
            ->join('classes', 'participation.class_id', '=', 'classes.id')
            ->where('participation.user_id', $id)
            ->select('classes.class_name as class_name', 'classes.id as class_id')
            ->get();

        return view('mypage.mypage-news', ['newses' => $newses], ['news_classes' => $news_classes]);
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
            ->select('questions.id as question_id', 'classes.class_name', 'users.family_name', 'users.first_name', 'question', 'solve', 'answer', 'questions.created_at as created_at')
            ->latest()
            ->get();

        return view('mypage.mypage-question', ['questions' => $questions]);
    }
    public function log()
    {
        $user = Auth::user();
        $id =   Auth::id();
        $schoolid = Auth::user()->schoolid;

        $logs = DB::table('logs')
            ->join('offer', 'logs.class_id', '=', 'offer.class_id')
            ->leftjoin('users', 'logs.user_id', '=', 'users.id')
            ->leftjoin('classes', 'logs.class_id', '=', 'classes.id')
            ->where('offer.class_id',  $schoolid)
            ->select('logs.id as logs_id', 'classes.class_name','classes.id as class_id',  'users.id as users_id','users.family_name', 'users.first_name', 'total_noface_time', 'max_noface_time', 'logs.created_at as enter_time', 'logs.updated_at as leave_time')
            ->latest('logs.updated_at')
            ->get();


        return view('mypage.mypage-log',['logs' => $logs]);
    }
    public function setup()
    {
        return view('mypage.mypage-setup');
    }
}

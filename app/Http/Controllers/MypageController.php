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
            ->where('participation.user_id',$id)
            ->get();

        return view('mypage',[ 'user' => $user ],[ 'classes' => $classes ]);

    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class StudentMeetingController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        return view('meeting.student-meetingroom',[ 'user' => $user ]);
    }
}

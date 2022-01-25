<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeacherMeetingController extends Controller
{
    public function index(Request $request)
    {

        return view('meeting.teacher-meetingroom');

    }
}

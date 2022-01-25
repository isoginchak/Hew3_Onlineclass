<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentMeetingController extends Controller
{
    public function index(Request $request)
    {


    return view('meeting.student-meetingroom');

    }
}

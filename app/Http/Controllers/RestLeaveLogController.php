<?php

namespace App\Http\Controllers;
use App\Models\LogsRestData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RestLeaveLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $logs = new LogsRestData;
        $class_id = DB::table('classes')->where('hash',$request->class_id)->select('id')->get();
        logger( $class_id[0]->id);

        $change_table= $logs::where('user_id', $request->user_id)
                        ->where('class_id', $class_id[0]->id)
                        ->latest()->first()
                        ->fill(['total_noface_time' => $request->total_noface_time,'max_noface_time' => $request->max_noface_time])->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
